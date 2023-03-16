import React from 'react';
import { Link } from 'react-router-dom';

import './privacy.scss';

import IMG from '../../utils/images';

const Privacy = ({ handleGoBackHome }) => {
  const [bgColor, setBgColor] = React.useState(false);

  React.useEffect(() => {
    const scrollElem = document.getElementById('privacy-content');
    scrollElem.addEventListener('scroll', () => {
      if (scrollElem.scrollTop > (window.innerWidth > 720 ? 238 : 160)) {
        setBgColor(true);
      } else {
        setBgColor(false);
      }
    });
  });
  return (
    <div className="privacy">
      <div className={bgColor ? 'privacy-header active' : 'privacy-header'}>
        <Link to="/">
          <img src={IMG.PRIVACY_LOGO} alt="logo" />
        </Link>
        {bgColor ? (
          <div className="header-privacy-title">Privacy Policy</div>
        ) : (
          ''
        )}
        <Link className="back-home" to="/">
          Back to Home
        </Link>
      </div>
      <div className="privacy-content" id="privacy-content">
        <div className="privacy-title">Privacy Policy</div>
        <div className="privacy-detail">
          <p>
            This Privacy Policy (“Privacy Policy”) describes the policies and
            procedures of ROAR IO Inc. d/b/a PerformLive (“PerformLive”, “we,”
            “us,” or “our”) on the collection, use and disclosure of your
            information in connection with access and use of website located at{' '}
            <a href="https://www.performlive.live" target="_blank">
              https://www.performlive.live
            </a>
            ,{'  '}
            <a href="https://www.Performlive.com" target="_blank">
              https://www.Performlive.com
            </a>{' '}
            (collectively known as the “Site”), and any Performlive mobile
            applications (the “Apps,” and together with the Site, the
            “Services”). We receive information about you from various sources,
            including: (i) if you register for an account on the Services,
            through your user account (your “Account”); (ii) your use of the
            Services generally; and (iii) from third party websites and
            services. When you use the Services, you are consenting to the
            collection, transfer, manipulation, storage, disclosure and other
            uses of your information as described in this Privacy Policy.
          </p>
          <p>
            This Privacy Policy is effective as of the last updated date stated
            at the top. We may change this Agreement of Service from time to
            time. Any such changes will be posted on the Site. By accessing the
            Services after we make any such changes to this Privacy Policy, you
            are deemed to have accepted such changes. Please refer back to this
            Agreement on a regular basis.
          </p>
        </div>
        <div className="we-collect">
          <h3>What does the Privacy Policy Cover?</h3>
          <p>
            This Privacy Policy covers the treatment of personally identifiable
            information ("Personal Data") gathered when you are using or
            accessing the Services. This Privacy Policy also covers our
            treatment of any Personal Data that our business partners share with
            us or that we share with our business partners.
          </p>
          <p>
            This Privacy Policy does not apply to the practices of third parties
            that we do not own or control, including but not limited to any
            third party websites, services and applications (each a "third party
            service") that you elect to access through the Services or to
            individuals that we do not manage or employ. While we attempt to
            facilitate access only to those third party services that share our
            respect for your privacy, we cannot take responsibility for the
            content or privacy policies of those third party services. We
            encourage you to carefully review the privacy policies of any third
            party services you access.
          </p>
        </div>
        <div className="privacy-info">
          <h3>What information do we collect about you?</h3>
          <p>
            <span className="text-underline">Generally</span>. We collect
            Personal Data about you when you provide such information directly
            to us, when third parties such as our business partners or service
            providers provide us with Personal Data about you, or when Personal
            Data about you is automatically collected in connection with your
            use of our Services. The information we gather enables us to
            improve, understand, and continue to operate the Services. In
            connection with certain aspects of the Services, we may request,
            collect and/or display some of your Personal Data..
          </p>
          <p>
            <span className="text-underline">
              Information You Provide to Us
            </span>
            .
            <ul className="subSection">
              <li>
                <span className="text-underline">Account Information</span>: If
                you create an Account you will provide information that could be
                Personal Data, including but not limited to, your phone number,
                name, user name, email address, profile picture, residence and
                preferences. Additionally, if you register for or access the
                Services using a third party service (such as your social media
                account login credentials), we may receive Personal Data that
                you have made available to share through such third party
                service, which may include, but not be limited to, your name and
                your email address. You acknowledge that this information may be
                personal to you, and by creating an Account and providing
                Personal Data to us, you allow others, including us, to identify
                you and therefore may not grant you anonymous access to our
                Services. We may use your contact information to send you
                information about our Services.
              </li>
              <li>
                <span className="text-underline">User Content</span>: The
                Services allow you to provide User Content (as defined in the
                Terms of Service) to the Services and other users of the
                Services, and related Personal Data if you so choose. All
                content submitted by you to the Services and related data may be
                retained by us indefinitely, even after you terminate your
                Account or your access to the Services is terminated. We may
                continue to disclose such content to third parties in a manner
                that does not reveal Personal Data, as described in this Privacy
                Policy. We may also use User Content as specified in the Terms
                of Service. In addition, if you choose to share User Content
                with other Service users, we may not be able to remove them from
                our servers or make them unavailable to anyone you have shared
                them with. Sending User Content through the Services is your
                decision. By choosing to share that information, you should
                understand that you may no longer be able to control how that
                information is used and that it may become publicly available
                (depending in part on your actions or the actions of others with
                whom you have shared the information). We are not responsible
                for any use or misuse of information you share.
              </li>
            </ul>
          </p>

          <p>
            <span className="text-underline">
              Information From Third Parties
            </span>
            . You may be able to register for or access the Services using a
            third party service, such as your social media account (e.g.
            Facebook, Twitter, etc.). Occasionally, you can also use your
            Account on our Services to interact with your accounts on these
            other third party services. For example, you may be able to access
            posting and sharing tools on the Services that allow you to post
            information to your social networks (“Share”) outside of the
            Services. By using these tools or third party services, you
            acknowledge that some information (such as your IP address, language
            preferences, timestamp and identifiers related to your request) may
            be transmitted to us, and that such information and content is
            covered by this Privacy Policy. Furthermore, if a tool, such as the
            Share tool, is operated by a third party service, the third party
            service that operates the tool may collect information about your
            browser or online activity, which would be subject to the third
            party service’s privacy policy and your account settings selected
            through that third party service. When you use these tools, some of
            your information from the Services may be shared with the third
            party service and others. Therefore, we encourage you to read the
            privacy policies and other policies of any third party services,
            including without limitation any applicable social networks, that
            you use in connection with the Services.
          </p>
          <p>
            <span className="text-underline">
              Information Collected Automatically.
            </span>
            <ul className="subSection">
              <li>
                {' '}
                We automatically receive and record information from your web
                browser or device, such as your IP address, device ID, user
                query information and cookie information, when you interact with
                the Services, including when you search for, select, view or
                interact with other user content. This information is used to
                enable us to deliver customized content to you, for fighting
                spam/malware, to improve the Services, to personalize your
                experience and also to facilitate collection of data concerning
                your interaction with the Services (e.g., what links you have
                clicked on). Your IP address may be used to send you
                geographically-targeted content and advertisements.
              </li>
              <li>
                Generally, the Services automatically collect usage information,
                such as the number and frequency of visitors to the Site and the
                Services. We may use this data in aggregate form, for example,
                as a statistical measure or in other anonymous forms, but not in
                a manner that would identify you personally. This type of
                aggregate data enables us and third parties authorized by us to
                figure out how often individuals use parts of the Services so
                that we can analyze and improve them.
              </li>
            </ul>
          </p>

          <p>
            <span className="text-underline">Location Information.</span> We may
            request access to your current location – provided by your mobile
            device using GPS or similar technologies – so that we can provide
            content that is more suitable to your location. For example, we may
            share information about the location of your device with advertisers
            to tailor the advertising you see, to your interests, or present you
            with offers from the businesses around you. You are free to accept
            or block access to your location information. You can switch off
            access to your location at any time through your device settings.
            The Services may collect and pass to third parties precise
            geolocation information linked to your mobile device or advertising
            identifiers and may do so when you use the Services or when the
            Services run in the background on your device. That information may
            be used by third parties to customize ads in the Services or in
            other apps: for instance, if your device is often located at or near
            movie halls, you might receive offers for tickets (even when you are
            not at a movie hall). The information also may be used for market or
            other research regarding aggregated traffic patterns: for instance,
            a company that analyzes shopping trends might use the information to
            learn whether more or fewer devices are seen near malls or in other
            shopping districts. We automatically collect usage information that
            does not identify an individual user (“Usage Data”). For example,
            when you download and use the Services on a mobile device, we
            automatically collect information such as your device type,
            operating system version and type, certain device settings, device
            time zone, device carrier, current IP address, applications
            installed on the device, and platform-specific advertising
            identifiers. We may also collect location information, such as your
            device GPS coordinates unless you configure your device operating
            system settings to prevent our collection of location information.
            Additionally, each time you use the Site we automatically collect
            the type of web browser you use, your operating system, your
            Internet Service Provider, your IP address, the pages you view, and
            the time and duration of your visits to the Site. We use this
            information to enhance the services we offer, provide targeted
            advertising, and to help us understand how people use the Site and
            Services. Aggregated device data, including location and usage data,
            is also measured for the purposes of market research. If you do not
            want this information to be linked to your device, you may go to
            your device “settings” (which are somewhat different for iOS and
            Android devices) and opt out of interest-based or personalized
            advertising. You may also prevent the location from being collected
            by this or other apps, through your device settings (but this may
            affect the functionality of certain app features).
          </p>
          <p>
            <span className="text-underline">Usage Information.</span> We may
            collect and store information about your usage of, and interaction
            with, the Services, including, messages, posts, information viewed,
            transaction related information, usage of the Services by
            geographies, device and connection information (such as a device
            advertising identifier or MAC address), IP address, device
            capability, bandwidth, web browser software, referring website,
            statistics on page views, network type and traffic to and from our
            websites.
          </p>
          <p>
            <span className="text-underline">
              Information Related to Advertisements, Advertising and the Use of
              Web Beacons.{' '}
            </span>
          </p>
          <p className="ml-2">
            When we serve an advertisement to your device, we collect
            information about your interaction with this advertisement to help
            us evaluate the performance of the advertisement that we show, such
            as whether you clicked on it, or installed the advertised product.
            The third parties that serve these advertisements may also collect
            other information about your interaction with an advertisement and
            about your browser or device. While we attempt to facilitate access
            only to those third party services that share our respect for your
            privacy, we cannot take responsibility for the content or privacy
            policies of those third party services. We encourage you to
            carefully review the privacy policies of any third party services
            you access.
          </p>
          <p className="ml-2">
            To support and enhance the Services, we may serve advertisements
            through the Services. These advertisements are sometimes targeted
            and served to particular users, including using your IP address to
            send you geographically-targeted advertisements, and may come from
            third party companies called "ad networks." Ad networks include
            third party ad servers, ad agencies, ad technology vendors and
            research firms. We may also receive anonymized user data from our
            Agents (defined below), so we can learn and make enhancements to
            offer you a better experience. Some of these entities may use
            cookies, web beacons and other technologies to collect information
            about your use of the Services and other websites, including your IP
            address, web browser, pages viewed, time spent on pages, links
            clicked and conversion information. This information may be used by
            us and others to, among other things, tailor the Services for you
            (for example, by providing search results in your preferred
            language), analyze and track data, determine the popularity of
            certain content, deliver advertising and content targeted to your
            interests on our Services and other websites and better understand
            your online activity.
          </p>
          <p className="ml-2">
            Advertisements served through the Services may be targeted to users
            who fit a certain general profile category and may be based on
            anonymized information inferred from information provided to us by a
            user, including Personal Data (e.g., gender or age), may be based on
            the Services usage patterns of particular users, or may be based on
            your activity on third party services. We do not provide Personal
            Data to any ad networks for use outside of the Services.
          </p>
          <p className="ml-2">
            To increase the effectiveness of ad delivery, we may deliver a file
            (known as a "web beacon") from an ad network to you through the
            Services. Web beacons allow ad networks to provide anonymized,
            aggregated auditing, research and reporting for us and for
            advertisers. Web beacons also enable ad networks to serve targeted
            advertisements to you when you visit other websites. Because your
            web browser must request these advertisements and web beacons from
            the ad network's servers, these companies can view, edit or set
            their own cookies, just as if you had requested a web page from
            their site.
          </p>
          <p className="ml-2">
            We may also collect advertising identifiers from your mobile device.
            Advertising identifiers are resettable identifiers unique to your
            mobile device, and which are used in connection with advertising
            delivered to your mobile device. The IDFA (developed by Apple, Inc.
            for the iPhone) and Google Ad ID (developed by Google for Android)
            are examples of advertising identifiers.
          </p>
          <p>
            <span className="text-underline">Device and Log Information.</span>{' '}
            We collect information about your device and browser. This may
            include device information (type of device, operating system
            version, unique device identifier (such as an advertising
            identifier), browser type and version, mobile network information)
            or log information (IP address, MAC address, screen resolution, and
            referring domain).
          </p>
          <p>
            <span className="text-underline">Error Reporting Information.</span>{' '}
            We also collect error-reporting information if the Services crash or
            hang so that we can investigate the error and improve the stability
            of the Services for future releases. In general, these reports do
            not contain personally identifiable information, or only
            incidentally do so. As part of these error reports, we receive
            information about the type and version of your device and browser,
            the device identifier, the time the error occurred, the feature
            being used and the state of the application when the error occurred.
            We do not use this information for any purpose other than for
            investigating and remedying the error.
          </p>
          <p>
            <span className="text-underline">
              Information Collected Using Cookies.
            </span>{' '}
            Cookies are pieces of text that may be stored to your computer or
            device through your web browser when you access a website. Your
            browser stores cookies in a manner associated with each website you
            visit. We may use cookies to enable our servers to recognize your
            web browser and tell us how and when you visit the Site and
            otherwise use the Services. Our cookies do not, by themselves,
            contain Personal Data. However, we may match cookies with your
            Personal Data to identify you, and we may use cookies to identify
            that your web browser has accessed aspects of the Services and may
            associate that information with your Account if you have one. We may
            allow third party web analytics service providers to use cookies or
            similar technologies to collect information about your use of the
            Services. We use Google Analytics, a service provided by Google,
            Inc. (“Google”) to help us understand how users use the Services and
            to enhance your experience when you use the Services. For more
            information on Google’s privacy practices, please go to{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
            >
              https://policies.google.com/technologies/partner-sites
            </a>{' '}
            and to opt out of data recording and analysis by Google Analytics on
            the Services, please visit{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">
              https://tools.google.com/dlpage/gaoptout
            </a>
            . Most browsers have an option for turning off the cookie feature,
            which will prevent your browser from accepting new cookies, as well
            as (depending on the sophistication of your browser software)
            allowing you to decide on acceptance of each new cookie in a variety
            of ways. We strongly recommend that you leave cookies active,
            because they enable you to take advantage of the most attractive
            features of the Services. This Privacy Policy covers our use of
            cookies only and does not cover the use of cookies by third parties.
            We do not control when or how third parties place cookies on your
            computer or device. For example, third party websites to which a
            link points may set cookies on your computer or device.
          </p>

          <p>
            <span className="text-underline">Aggregate Information.</span> We
            collect statistical information about how both unregistered and
            registered users, collectively, use the Services ("Aggregate
            Information"). Some of this information is derived from Personal
            Data. This statistical information is not Personal Data and cannot
            be tied back to you, your Account, or your web browser.
          </p>
          <p>
            <span className="text-underline">Personal Data of Children. </span>
            If you are under 18, please do not attempt to register for the
            Services or send any Personal Data about yourself. If we learn that
            we have collected Personal Data from a child under age 18, we will
            delete that information as quickly as possible.
          </p>
          <p>
            <span className="text-underline">Facial Scans.</span>
            If you access our mobile application through certain devices, you
            may use your camera to use our AR feature which incorporates facial
            scanning. We use facial scans to recognize your face and provide
            certain features back to you. We only use your facial scan to
            provide the Services back to you. Because your facial scans are
            unique to you and may be personally identifying, we do not store
            your facial scans or any related facial data on our servers or
            otherwise disclose or share such data with third parties or other
            users. We do not sell, lease, trade or otherwise profit from your
            facial scans or any related data. Since we do not retain any data
            arising out of your facial scans, we will not be able to recover any
            data from your facial scans.
          </p>
        </div>

        <div className="privacy-info">
          <h3>How and with whom do we share your information?</h3>
          <p>
            The Services are designed to help you share appropriate information
            only with others. As a result, some of the information generated
            through the Services is shared publicly or with third party
            services. What information is shared publicly depends on your
            privacy settings. The following sections explain in greater detail
            the ways in which we may share your information. We do not sell your
            Personal Data.
          </p>
        </div>
        <div className="privacy-info">
          <h3>How we use information?</h3>
          <p>
            <span className="text-underline">Generally;</span>{' '}
            <span className="text-underline">For Use of Services.</span> In
            addition to using your information to provide you with the Services
            that you request, we use or may disclose your personally
            identifiable information as follows: To verify your identity; To
            connect you with others as enabled by the Services; To share your
            Profile with others on the Services in accordance with your account
            settings; To allow your use of certain features of the Services that
            may be offered from time to time (such as games, animations, etc.)
            and to help customize your user experience; To show you the names
            and profiles of the contacts with whom you communicate and to show
            your name and profile to persons with whom you communicate on the
            Services; To manage your account, deliver to you any administrative
            notices, updates, notifications, alerts and communications relevant
            to your use of the Services; To provide you with relevant content
            that you requested, using information that you allow us to collect
            from you or that you provide to a social media provider with which
            your account is connected, such as information regarding your and
            your contacts’ respective locations; To share information about the
            games you play on our Services (your scores or your experience),
            with your contacts according to your settings; To understand (i) how
            you use the different features of the Services, (ii) what your
            preferences are – for example, what type of games you like to play
            or what type of products you like to view or purchase, and (iii) how
            to make suggestions and recommendations of things (for example,
            games and products) you may be interested in; To keep your list of
            contacts up to date – for example, when new users join; To solicit
            information from you, including through surveys; To contact you via
            email, SMS or otherwise for the purpose of informing you about new
            products, services or promotions offered by us (you can opt-out of
            such emails by clicking on the unsubscribe link, withhold your
            consent to receive an SMS or reply stop to an SMS in order not to
            receive future SMSs); For internal operations, including
            troubleshooting problems, data analysis, testing, research,
            improvements to the Service, detecting and protecting against error,
            fraud or other illegal activity, when we believe it is appropriate
            to investigate, prevent, or take action regarding illegal or
            suspected illegal activities.
          </p>
          <p>
            <span className="text-underline">
              Public Information About You and Your Activity on the Services.
            </span>{' '}
            User profile information that you choose to provide, including your
            username, information about yourself, your avatar/profile picture
            and a description of your channel may be displayed to other users to
            facilitate user interaction within the Services. This information
            will be displayed to other users depending on your privacy settings.
            We will not directly reveal user email addresses to other users.
            Some of your activity on and through the Services is public by
            default. This may include, but is not limited to, content you have
            posted publicly on the Site or otherwise through the Services. For
            registered users, all content you post publicly (or privately) will
            be associated with your account. Unregistered users will not have
            this association, but information concerning their use of the
            Services (such as what pages they have visited) may be tracked
            through the use of cookies and stored by us. If you choose to
            provide Personal Data using certain public features of the Services,
            then that information is governed by the privacy settings of those
            particular features and may be publicly available. Individuals
            reading such information may use or disclose it to other individuals
            or entities without our control and without your knowledge, and
            search engines may index that information. We therefore urge you to
            think carefully about including any specific information you may
            deem private in content that you create or information that you
            submit through the Services.
          </p>
          <p>
            <span className="text-underline">
              Information Shared Through third party services.
            </span>{' '}
            You may access other third party services through the Services, for
            example by clicking on links to those third party services from
            within our Services. We are not responsible for the privacy policies
            and/or practices of these third party services, and you are
            responsible for reading and understanding those third party
            services' privacy policies. This Privacy Policy only governs
            information collected on the Services.
          </p>

          <p>
            <span className="text-underline">
              Information Shared to Our Service Providers.
            </span>{' '}
            We employ and contract with people and other entities that perform
            certain tasks on our behalf and who are under our control (our
            "service providers"). We may need to share Personal Data with our
            service providers in order to provide products or services to you.
            Unless we tell you differently, our service providers do not have
            any right to use Personal Data or other information we share with
            them beyond what is necessary to assist us. You hereby consent to
            our sharing of your Personal Data with our service providers. For
            example, these service providers would include: SMS and email
            providers who deliver the authentication SMS or email to you when
            you register with the Services and with whom We share your phone
            number or email. Entities who provide services or functions on our
            behalf, such as hosting, business analytics, customer service,
            collecting or processing credit and debit card information and
            payments, marketing, distribution of surveys and fraud prevention.
            While we collect and store IP address and device ID information,
            that information is not made public. We do at times, however, share
            this information with our service providers and as otherwise
            specified in this Privacy Policy
          </p>

          <p>
            <span className="text-underline">
              Information Shared In Connection with Related Services.
            </span>{' '}
            We also share Aggregate Information with our partners, service
            providers and other persons with whom we conduct business, including
            advertisers and investors. Aggregate or anonymous information is
            information that does not, on its own, identify you personally. For
            example, we may tell our advertisers the number of users our app
            receives or share anonymous identifiers (such as device advertising
            identifiers or hashed email addresses) with advertisers and business
            partners. This information does not contain any personally
            identifiable information. We share this type of statistical data so
            that our partners can understand in what manner and how often people
            use our Services and their services or websites, which facilitates
            improving both their services and how our Services interface with
            them. In addition, these third parties may share with us
            non-private, aggregated or otherwise non-Personal Information about
            you that they have independently developed or acquired.
          </p>

          <p>
            <span className="text-underline">
              Business Partners and Other Users.
            </span>{' '}
            We have relationships with other companies, where we serve as the
            publisher or distributor of the applications, products, or services
            developed by those third parties, including other users of the
            Services. In this case, both we and that third party may have access
            to certain information about your use of that third party's
            application, product, or service. In this case, the information that
            we collect is subject to this Privacy Policy and the information
            that the third party collects is subject to that third party’s
            privacy policy.
          </p>

          <p>
            <span className="text-underline">
              Display of Tailored Advertising.
            </span>{' '}
            We allow third parties with whom we have a separate agreement to use
            certain technologies to collect information about your browser or
            device and the placement, views, and clicks of their advertisements,
            so that they can better serve interest-based advertisements to our
            users and visitors. These third parties include (1) business
            partners, who collect information when you view or interact with one
            of their advertisements on the Services; (2) attribution partners
            who help us measure effectiveness of certain advertisements; and (3)
            advertising networks, which collect information about your browser
            or device and your interests when you view or interact with one of
            their advertisements. The information gathered by these third
            parties is used to make predictions about your interests or
            preferences so that they can display advertisements on the Services
            and on other sites across the Internet tailored to your apparent
            interests. We do not share with these third parties any information
            that would personally identify you (such as email address) for
            purposes of such advertising; however, these third parties may have
            access to information about your device (such as an advertising
            identifier or MAC address). We do not have access to, or have
            control over, the technologies that these third parties may use to
            collect information about your interests. Additionally, the
            information practices of these third parties are not covered by this
            Privacy Policy.
          </p>

          <p>
            <span className="text-underline">
              Information Disclosed Pursuant to a Change in Control or Sale.
            </span>{' '}
            In some cases, we may choose to buy or sell assets. In these types
            of transactions, user information is typically one of the
            transferred business assets. Moreover, if we, or substantially all
            of our assets, were acquired, or if we go out of business or enter
            bankruptcy, user information would be one of the assets that is
            transferred or acquired by a third party. You acknowledge that such
            transfers may occur, and that any acquirer of us or our assets may
            continue to use your Personal Data as set forth in this Privacy
            Policy.
          </p>

          <p>
            <span className="text-underline">
              Information Disclosed for Our Protection and the Protection of
              Others.
            </span>{' '}
            We also reserve the right to access, read, preserve, and disclose
            any information as we reasonably believe is necessary to (i) satisfy
            any applicable law, regulation, legal process or governmental
            request, (ii) enforce this Privacy Policy and our Terms of Service,
            including investigation of potential violations thereof, (iii)
            detect, prevent, or otherwise address fraud, security or technical
            issues, (iv) respond to user support requests, or (v) protect the
            rights, property and safety, of Us and our users and the public.
            This includes exchanging information with other companies and
            organizations for fraud protection and spam/malware prevention.
          </p>
        </div>

        <div className="privacy-info">
          <h3>What Choices Do I Have Regarding My Information?</h3>
          <p>
            <span className="text-underline">
              Access and Control Your Personal Data.
            </span>{' '}
            If you are a registered user, you can access information associated
            with your Account by logging into the Services. Registered and
            unregistered users can access and delete cookies through their web
            browser settings. You can use many of the features of the Services
            without registering, thereby limiting the type of information that
            we collect. You can always opt not to disclose certain information
            to us, but please note that such information may be needed to take
            advantage of some of our features. You can opt-out of certain
            cookies and tracking technologies by following the steps set forth
            above. Your browser may offer you a “Do Not Track” or “DNT” option,
            which allows you to signal to operators of websites, and web
            applications, and services that you do not wish such operators to
            track certain of your online activities over time and across
            different websites.{' '}
            <span className="text-underline">California Privacy Rights.</span>{' '}
            Under California Civil Code sections 1798.83-1798.84, California
            residents are entitled to ask us for a notice identifying the
            categories of personal customer information which we share with our
            affiliates and/or third parties for marketing purposes, and
            providing contact information for such affiliates and/or third
            parties. If you are a California resident and would like a copy of
            this notice, please submit a written request to the following
            address:{' '}
            <span className="highlight">
              Performlive, 330 Washington St #172, Hoboken NJ 07030
            </span>
          </p>
          <p>
            <span className="text-underline">
              Opt-Out of Targeted Advertising.
            </span>{' '}
            Through the Digital Advertising Alliance (“DAA”) and Network
            Advertising Initiative (“NAI”), several media and marketing
            associations have developed an industry self-regulation program to
            give consumers a better understanding of and greater control over
            ads that are customized based on their online behavior across
            different websites. To make choices about interest-based ads from
            participating third parties, please visit the DAA’s or NAI’s
            consumer opt out pages, which are located at{' '}
            <a
              href="http://www.networkadvertising.org/choices/"
              target="_blank"
            >
              http://www.networkadvertising.org/choices/
            </a>{' '}
            and www.aboutads.info/choices. Reset your mobile device’s
            advertising identifier or set it to opt out of targeted advertising:
            <ul className="subSection">
              <li>
                iOS: You can opt-out of targeted advertising by choosing “Limit
                Ad Tracking” in your device’s settings menu.
              </li>
              <li>
                Android: You can reset your advertising ID at any time from the
                Ads section under Settings on your device, or you can also
                opt-out of targeting advertising in this same section.
              </li>
            </ul>
            Opting-out of targeted advertising does not mean that you will no
            longer receive advertising, but just that the advertising that you
            do receive will not be customized to you and may feel less relevant
            to you.
          </p>
          <p>
            <span className="text-underline">
              Opt-Out – Promotional Communications.
            </span>{' '}
            We allow you to choose not to receive promotional email messages
            from the Services or Our service providers. You may opt-out by
            following instructions in the message sent by Us or Our service
            providers on how to unsubscribe from that particular mailing. You
            may also opt-out by contacting us at{' '}
            <a href="mailto:info@jlstream.com">info@jlstream.com</a>.
          </p>
          <p>
            <span className="text-underline">Delete Your Account.</span> If you
            terminate your Account, any association between your Account and
            information we store will no longer be accessible through your
            Account. However, given the nature of sharing on the Services, any
            public activity on your Account prior to deletion will remain stored
            on our servers and may remain accessible to the public.
          </p>
        </div>
        <div className="privacy-info">
          <h3>How Long Do We Retain Your Personal Data?</h3>
          <p>
            We retain Personal Data about you for as long as you have an open
            account with us or as otherwise necessary to provide you Services.
            In some cases, we retain Personal Data for longer, if doing so is
            necessary to comply with our legal obligations, resolve disputes or
            collect fees owed, or is otherwise permitted or required by
            applicable law, rules or regulation. Afterwards, we retain some
            information in a depersonalized or aggregated form but not in a way
            that would identify you personally.
          </p>
        </div>

        <div className="privacy-info">
          <h3>Is the Information About Me Secure?</h3>
          <p>
            Your Account information will be protected by a password for your
            privacy and security. You need to prevent unauthorized access to
            your Account and Personal Data by selecting and protecting your
            password appropriately and limiting access to your computer and
            browser by signing off after you have finished accessing your
            Account. We seek to protect Account information to ensure that it is
            kept private; however, we cannot guarantee the security of any
            Account information. We store all of our information, including your
            IP address information, using industry-standard security techniques.
            We do not guarantee or warrant that such techniques will prevent
            unauthorized access to information about you that we store, Personal
            Data or otherwise. Unauthorized entry or use, hardware or software
            failure, and other factors, may compromise the security of user
            information at any time.
          </p>
        </div>

        <div className="privacy-info">
          <h3>Where Is My Data Stored And What About Data Transfer?</h3>
          <p>
            We currently store information in the United States but Information
            may be stored and processed in any country in which we maintain
            facilities. In this regard, or for purposes of sharing or disclosing
            data as described in this Privacy Policy, we reserve the right to
            transfer information outside of your country. By using the Services,
            you consent to any such transfer of information outside of your
            country.
          </p>
        </div>

        <div className="privacy-info">
          <h3>What If I Have Questions or Concerns?</h3>
          <p>
            If you have any questions or concerns regarding privacy using the
            Services, please send us a detailed message to [Insert privacy
            contact email].
          </p>
        </div>

        <div className="privacy-info">
          <h3 className="section-heading">
            Provisions Applicable to Residents of the European Union (“EU”),
            United Kingdom, Lichtenstein, Norway, or Iceland
          </h3>
          <p>
            If you are a resident of the EU, United Kingdom, Lichtenstein,
            Norway, or Iceland, you may have additional rights under the EU
            General Data Protection Regulation (“GDPR”) with respect to your
            Personal Data, as outlined below.{' '}
          </p>
          <p>
            For this section, we use the terms “Personal Data” and “processing”
            as they are defined in the GDPR, but “Personal Data” generally means
            information that can be used to individually identify a person, and
            “processing” generally covers actions that can be performed in
            connection with data such as collection, use, storage and
            disclosure. We will be the controller of your Personal Data
            processed in connection with the Services. If there are any
            conflicts between this section and any other provision of this
            Privacy Policy, the policy or portion that is more protective of
            Personal Data shall prevail in that context. If you have any
            questions about this section or whether any of the following applies
            to you, please contact Us at{' '}
            <a href="mailto:datagov@jlstream.com">datagov@jlstream.com</a>.
          </p>
          <p>
            We will only process your Personal Data if we have a lawful basis
            for doing so. Lawful bases for processing include consent,
            contractual necessity and Our “legitimate interests” or the
            legitimate interest of others, as further described below. The legal
            bases depend on the Services you use and how you use them.
          </p>
          <p>
            <span className="text-underline"> Contractual Necessity.</span> We
            process the following categories of Personal Data as a matter of
            “contractual necessity”, meaning that we need to process the data to
            perform under our Terms of Service with you, which enables us to
            provide you with the Services: IP Address, Profile Data, Device ID
            and Cookie Data. When we process data due to contractual necessity,
            failure to provide such Personal Data will result in your inability
            to use some or all portions of the Services that require such data.
          </p>
          <p>
            <span className="text-underline">Legitimate Interest.</span>
            We process the following categories of Personal Data when we believe
            it furthers the legitimate interest of us or third parties (which is
            not overridden by your data protection interests): IP Address,
            Profile Data, Device ID and Cookie Data. Examples of these
            legitimate interests include: operation and improvement of our
            business, products and services, marketing of our products and
            services, provision of user support, protection from fraud or
            security threats, compliance with legal obligations and facilitation
            of corporate transactions.
          </p>
          <p>
            <span className="text-underline">Consent.</span> In some cases,
            including facial scans, we may process Personal Data based on the
            consent you expressly grant to us at the time we collect such data.
            When we process Personal Data based on your consent, it will be
            expressly indicated to you at the point in time of collection.
          </p>
          <p>
            <span className="text-underline"> Other Processing Grounds.</span>
            From time to time we may also need to process Personal Data to
            comply with legal obligations, if it is necessary to protect the
            vital interests of you or other data subjects, or if it is necessary
            for a task carried out in the public interest.
          </p>
          <p>
            <span className="text-underline">
              Your Rights Regarding Your Personal Data.
            </span>{' '}
            You have certain rights with respect to your Personal Data,
            including those set forth below. For more information about these
            rights, or to submit a request, please email{' '}
            <a href="mailto:legal@performlive.com">legal@performlive.com</a>.{' '}
            Please note that in some circumstances, we may not be able to fully
            comply with your request, such as if it is frivolous, extremely
            impractical, jeopardizes the rights of others, or is not required by
            law; but in those circumstances, we will still respond to notify you
            of such a decision. In some cases, we may also need you to provide
            us with additional information, which may include Personal Data, if
            necessary, to verify your identity and the nature of your request.
            <ul className="subSection">
              <li>
                <span className="text-underline">Access</span>: You can request
                more information about the Personal Data we hold about you and
                request a copy of such Personal Data.
              </li>
              <li>
                <span className="text-underline">Rectification</span>: If you
                believe that any Personal Data that we are holding about you is
                incorrect or incomplete, you can request that we correct or
                supplement such data. You can also correct some of this
                information directly by updating any of the information
                contained in your user profile.
              </li>
              <li>
                <span className="text-underline">Erasure</span>: You can request
                that we erase some or all of your Personal Data from our
                systems.
              </li>
              <li>
                <span className="text-underline">Withdrawal of Consent</span>:
                If we are processing your Personal Data based on your consent
                (as indicated at the time of collection of such data), you have
                the right to withdraw your consent at any time. Please note,
                however, that if you exercise this right, you may have to then
                provide express consent on a case-by-case basis for the use or
                disclosure of certain of your Personal Data, if such use or
                disclosure is necessary to enable you to utilize some or all of
                our Services.
              </li>
              <li>
                <span className="text-underline">Portability</span>: You can ask
                for a copy of your Personal Data in a machine-readable format.
                You can also request that we transmit the data to another
                controller where technically feasible.
              </li>
              <li>
                <span className="text-underline">Objection</span>: You can
                contact us to let us know that you object to the further use or
                disclosure of your Personal Data for certain purposes.
              </li>
              <li>
                <span className="text-underline">
                  Restriction of Processing
                </span>
                : You can ask us to restrict further processing of your Personal
                Data.
              </li>
              <li>
                <span className="text-underline">Right to File Complaint</span>:
                You have the right to lodge a complaint about Our practices with
                respect to your Personal Data with the supervisory authority of
                your country or EU Member State.
              </li>
            </ul>
          </p>
          <p>
            <span className="text-underline">Transfers of Personal Data</span>:
            The Services are hosted and operated in the United States through Us
            and our service providers, and if you do not reside in the United
            States, laws in the United States may differ from the laws where you
            reside. By using the Services, you acknowledge that any Personal
            Data about you, regardless of whether provided by you or obtained
            from a third party, is being provided to Us in the United States and
            will be hosted on United States located servers, and you authorize
            us to transfer, store and process your information to and in the
            United States and possibly other countries. We are subject to the
            investigatory and enforcement powers of the United States.
          </p>
          <p>
            <span className="text-underline">Questions.</span> If you have any
            questions about this section or our data practices generally, please
            contact us using the following information:
            <address className="subSection">
              <a href="legal@performlive.com" target="_blank">
                legal@performlive.com
              </a>{' '}
              <span>Performlive</span>
              <span> 330 Washington St #172</span>
              <span> Hoboken NJ 07030</span>
            </address>
          </p>
        </div>

        <div className="privacy-info">
          <h3 className="section-heading">
            Provisions Applicable to Residents of California
          </h3>
          <p>
            <span className="text-underline">
              Personal Information We Collect
            </span>
            . We collect certain “Personal Information,” as defined by the
            California Consumer Privacy Act 2018 (“CCPA”) and as listed in the
            section of the main body of the Privacy Policy titled “What
            Information Do We Collect About You?”. In addition, you may have
            chosen to provide your age and gender identity when creating an
            Account. Personal Information does not include: (a) publicly
            available information from government records; (b) deidentified
            information or aggregate consumer information. We obtain the
            categories of Personal Information listed in the “What Information
            Do We Collect About You?” section above from the following
            categories of sources:
            <ul className="subSection">
              <li>Directly from you</li>
              <li>
                Indirectly when you use our services (e.g. via your web browser
                or device, or via cookies)
              </li>
              <li>third party services (e.g. Facebook or Twitter)</li>
              <li>Integration Partners</li>
            </ul>
          </p>
          <p>
            <span className="text-underline">Use of Personal Information</span>.
            We may use the Personal Information we collect for the following
            purposes:
            <ul className="subSection">
              <li>Improve, understand, personalize and operate our Services</li>
              <li>
                Promote the safety, integrity, and security of our Services
              </li>
              <li>Communicate with you</li>
              <li>Perform other business purposes</li>
            </ul>
            In addition to the above, we use Personal Information for the
            purposes of analyzing the efficacy of advertising campaigns and to
            conduct marketing.
          </p>
          <p>
            <span className="text-underline">Sharing Personal Information</span>
            . We do not sell your Personal Information. We disclose Personal
            Information to third parties and for various purposes as listed in
            the section of the main body of the Privacy Policy titled “How and
            with whom do we share your information?”.
          </p>
          <p>
            <span className="text-underline">Right to Know</span>: You may, not
            more than twice in a twelve-month period, request more information
            about the Personal Information we collect, use, or disclose, and
            request a copy of such Personal Information by emailing us at
            <a href="mailto:legal@performlive.com">legal@performlive.com</a> You
            can also access certain of your Personal Information by logging on
            to your account.
          </p>
          <p>
            <span className="text-underline">Right to Opt-Out</span>: You have
            the right to opt-out of the sale of your Personal Information under
            the CCPA, but, we do not sell your Personal Information.
          </p>
          <p>
            <span className="text-underline">Right to Request Deletion</span>:
            You may request that we delete the Personal Information that we have
            collected from you by emailing us at{' '}
            <a href="mailto:datagov@jlstream.com">datagov@jlstream.com</a>.
            However, we may not be required to delete your Personal Information
            under certain circumstances, including if such data is necessary for
            us to provide you with the Services, if we use such data only for
            our internal analytical use, and if such data is needed to complete
            a transaction or other action you have requested. If you request
            that we delete your Personal Information, you may no longer be able
            to use the Services.
          </p>
          <p>
            <span className="text-underline">Right to Non-Discrimination</span>:
            We will not discriminate against you for exercising your privacy
            rights under the CCPA.
          </p>
        </div>

        <div className="privacy-info">
          <p>
            To protect your information, we may need to verify your identity
            before processing your request to exercise your “right to know” and
            “right to request deletion.” In some cases, we may need to collect
            additional information (such as a government issued ID) to verify
            your identity. Under the CCPA, you may exercise these rights
            yourself or you may designate an authorized agent to make these
            requests on your behalf. We may request that your authorized agent
            have written permission from you to make requests on your behalf and
            may need to verify your authorized agent’s identity.
          </p>
          <p>
            If you have questions about this section or how to exercise your
            rights, please contact us by emailing{' '}
            <a href="mailto:legal@performlive.com"> legal@performlive.com</a>
          </p>
        </div>
        <div className="privacy-bottom">
          <img src={IMG.PRIVACY_LOGO} />
          <p>Ⓒ 2021 PerformLive. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

Privacy.propTypes = {};

export default Privacy;
