import groovy.json.JsonSlurperClassic
stage ('Checkout and build'){
    node('java2') {
	      cleanWs()

        checkout scm
        echo "Source branches: ${scm.branches}"

        gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
        commitMessage = sh(returnStdout: true, script: 'git show -s --format=%s').trim()
        shortCommit = gitCommit.take(6)
        gitBranch = scm.branches[0].name
        //env.BRANCH_NAME

        buildVersion = sh(returnStdout: true, script: 'cat ./version.json | jq -r ".version"').trim()
        buildDisplayName = "${buildVersion}-${env.BUILD_NUMBER}-${shortCommit}"
        currentBuild.displayName = buildDisplayName

        println gitCommit
        println commitMessage
        echo 'println(commitMessage.matches("(.*)[noCI](.*)"))'
        println println(commitMessage.matches("(.*)[noCI](.*)"))
        println shortCommit
        println gitBranch
        println buildVersion

        if (commitMessage ==~ /(.*)\[noCI\](.*)/) { println 'Commit consist [noCI] message. Will not be built' }
        else {
          sh "env"
          bitbucketStatusNotify(buildState: 'INPROGRESS')

          if (gitBranch == 'master'){
              properties([
                  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '60', numToKeepStr: '')),
                  pipelineTriggers([])])
                  aws_account_ID = '158368751307'
                  region = 'us-east-1'
          } else {
                  properties([
                  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '60', numToKeepStr: '')),
                  pipelineTriggers([[$class: 'BitBucketTrigger']])])
                  aws_account_ID = '158368751307'
                  region = 'us-east-1'
          }

          try{
              if (gitBranch == 'develop'){ sh "sed -e 's/\${command}/build:web:dev/' Dockerfile.template >> Dockerfile" }
              if (gitBranch == 'staging'){ sh "sed -e 's/\${command}/build:web:staging/' Dockerfile.template >> Dockerfile" }
              if (gitBranch == 'master'){ sh "sed -e 's/\${command}/build:web:prod/' Dockerfile.template >> Dockerfile" }

              container_name="${aws_account_ID}.dkr.ecr.${region}.amazonaws.com/performlive-web:${buildDisplayName}-${gitBranch}"

              sh("eval \$(aws ecr get-login --region ${region}| sed 's/-e none//')")
              sh("docker build -f ./Dockerfile -t ${container_name} .")
              sh("docker push ${container_name}")
              sh("docker rmi ${container_name}")


          } catch (e) {
              bitbucketStatusNotify(buildState: 'FAILED')
              currentBuild.result = "FAILED"
              notifyBuild(currentBuild.result)
              throw e
          } finally { }
        }
    }
}

stage ('deploy to aws'){
    node('master') {
      if (commitMessage ==~ /(.*)\[noCI\](.*)/) { println 'Commit consist [noCI] message. Will not be deployed' }
      else {
        try {
          buildDisplayName = "${buildDisplayName}-${gitBranch}"
          if (gitBranch == 'master'){
                slavejob = build job: 'PerformLive-Deploy-Prod', parameters: [[$class: 'StringParameterValue', name: 'ParameterKey', value: 'VersionWebService'], [$class: 'StringParameterValue', name: 'ParameterValue', value: buildDisplayName]]
              }
          if (gitBranch == 'staging'){
                slavejob = build job: 'PerformLive-Deploy-Staging', parameters: [[$class: 'StringParameterValue', name: 'ParameterKey', value: 'VersionWebService'], [$class: 'StringParameterValue', name: 'ParameterValue', value: buildDisplayName]]
              }
          if (gitBranch == 'develop'){
                slavejob = build job: 'PerformLive-Deploy-DEV', parameters: [[$class: 'StringParameterValue', name: 'ParameterKey', value: 'VersionWebService'], [$class: 'StringParameterValue', name: 'ParameterValue', value: buildDisplayName]]
              }

          println '-------------'
          println slavejob.getResult()
          println '-------------'

          if (slavejob.getResult() == 'SUCCESS') { bitbucketStatusNotify(buildState: 'SUCCESSFUL') }
            else {
              bitbucketStatusNotify(buildState: 'FAILED')
              currentBuild.result = "FAILED"
              }
        } catch (e) {
            bitbucketStatusNotify(buildState: 'FAILED')
            currentBuild.result = "FAILED"
            throw e
          } finally {notifyBuild(currentBuild.result)}
      }
    }
}

@NonCPS
def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  //def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  // Override default values based on build status
  /*if (buildStatus == 'STARTED') {
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    colorCode = '#00FF00'
  } else {
    colorCode = '#FF0000'
  }*/

  // Send notifications
  //slackSend (color: colorCode, channel: '#roar_jenkins', message: summary)

  emailext body: summary, subject: subject, to: 'sergey.skvortsov@theroar.io xiao.piao@theroar.io'
}
