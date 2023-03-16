import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { PerformanceFooter } from '../../components/PerformanceFooter/PerformanceFooter';
import useApi from '../../../../hooks/api';
import CoverPhoto from '../../components/coverPhoto/coverPhoto';
import PreviewVideo from '../../components/PreviewVideo/PreviewVideo';
import RecordVideo from '../../components/RecordVideo/RecordVideo';
import './previewPerformance.scss';
import Loader from '../../../../components/Loader';

const PreviewPerformance = forwardRef(
  ({ performanceId, performanceData, onNextClick, onBack }, ref) => {
    const [videoInfo, setVideoInfo] = useState(performanceData.videoUrl);
    const [recorderOpen, setRecorderOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [uploadCoverData, setUploadCoverData] = useState(
      performanceData.coverUrl,
    );

    const {
      file: { postFileUpload },
      performer: {
        postPerformerPerformanceIdIdPreview,
        getPerformerPerformanceIdIdPreview,
        putPerformerPerformanceIdId,
        deletePerformerPerformanceIdIdPreview,
      },
    } = useApi();

    useQuery(
      `performance_${performanceId}_preview`,
      () => getPerformerPerformanceIdIdPreview(performanceId),
      {
        enabled: !!performanceId,
        onSuccess: res => {
          setVideoInfo(res.videoUrl);
        },
      },
    );

    const handleStepChange = cb => async () => {
      const data = {};
      setIsLoading(true);
      try {
        if (videoInfo instanceof File) {
          const formData = new FormData();
          formData.append('file', videoInfo);
          const videoRes = await postFileUpload(formData);
          const previewExitsRes = await getPerformerPerformanceIdIdPreview(
            performanceData.id,
          ).catch(e => {});

          if (previewExitsRes) {
            await deletePerformerPerformanceIdIdPreview(performanceData.id);
          }
          await postPerformerPerformanceIdIdPreview(performanceData.id, {
            videoUrl: videoRes.url,
            name: 'default name',
            details: 'default details',
          });

          setVideoInfo(videoRes.url);
          data.videoUrl = videoRes.url;
        }

        if (uploadCoverData instanceof File) {
          const formData = new FormData();
          formData.append('file', uploadCoverData);
          const res = await postFileUpload(formData);
          await putPerformerPerformanceIdId(performanceData.id, {
            coverUrl: res.url,
          });

          setUploadCoverData(res.url);
          data.coverUrl = res.url;
        }
        cb(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const handlePlayVideoPreview = data => {
      setRecorderOpen(false);
      setVideoInfo(data);
    };

    useImperativeHandle(ref, () => ({
      saveChild(cb) {
        handleStepChange(cb)();
      },
    }));

    return (
      <>
        <div className="preview-container">
          <PreviewVideo
            performanceName={performanceData.name}
            onFileSelect={handlePlayVideoPreview}
            videoInfo={videoInfo}
            onClickRecord={() => setRecorderOpen(true)}
          />

          <CoverPhoto
            onImageFileSelect={setUploadCoverData}
            imageFile={uploadCoverData}
          />

          {recorderOpen && (
            <RecordVideo
              onStopRecording={handlePlayVideoPreview}
              onClose={() => setRecorderOpen(false)}
            />
          )}
        </div>

        <PerformanceFooter
          onNext={handleStepChange(onNextClick)}
          nextButtonText="Next: Summary"
          nextButtonDisabled={!uploadCoverData || !videoInfo}
          onBack={onBack}
        />
        {isLoading && <Loader />}
      </>
    );
  },
);

PreviewPerformance.propTypes = {
  onNextClick: PropTypes.func,
  coverFile: PropTypes.any,
  performanceData: PropTypes.object,
  saveAsDraft: PropTypes.bool,
};

export default PreviewPerformance;
