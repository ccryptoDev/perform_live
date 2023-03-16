import React, { useRef, useState } from 'react';
import { compose } from 'redux';
import _get from 'lodash/get';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import config from 'app/config/index.config';
import reducer from './state/performanceScheduler.reducer';
import saga from './state/performanceScheduler.saga';

import { injectReducer, injectSaga } from './performanceScheduler.dependencies';

import './performanceScheduler.scss';

import CreatePerformanceForm from './screens/createPerformance/createPerformanceForm';
import {
  roundUpToQuarter,
  useQuery as useLocationQuery,
} from '../../utils/common';

import PreviewPerformance from './screens/previewPerformance/previewPerformance';
import AddProducts from './screens/addProducts';
import AlertModal from './components/alertModal/AlertModal';
import Button from '../../components/Common/Button';
import BasketIcon from '../../../assets/svg/btns/basket-white.svg';
import LinesImg from '../../../assets/svg/creating/lines.svg';
import EllipseImg from '../../../assets/svg/creating/ellipse.svg';
import SocialShareModal from '../../components/SociaShareModal/SocialShareModal';
import Summary from './screens/summary/summary';

import PerformanceSideBar from './components/PerformanceSideBar/PerformanceSideBar';
import useApi from '../../hooks/api';

export const PerformanceScheduler = () => {
  const childRef = useRef(null);
  const query = useLocationQuery(window.location.search);
  const { id: performanceId } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [deletePF, setDeletePF] = useState(false);
  const {
    putPerformerPerformanceIdId,
    getPerformerPerformanceIdId,
    getPerformerPerformanceIdIdCategories,
    deletePerformerPerformanceIdId,
  } = useApi('performer');

  const updatePerformance = useMutation(({ id, data }) =>
    putPerformerPerformanceIdId(id, data),
  );
  const history = useHistory();

  const [performanceData, setPerformanceDataForm] = useState({
    name: '',
    details: '',
    start: roundUpToQuarter(30),
    end: roundUpToQuarter(90),
    type: query.get('type'),
    state: 'draft',
    participationPaid: false,
    // participationPurchaseId: null,
    stageEnabled: false,
    // stagePurchaseId: null,
    stageLimit: 0,
    maxAudienceSize: 0,
    categories: [],
    coverUrl: null,
    giftEnabled: false,
    giftPurchasesIds: [],

    // internal
    selectedProducts: [],
  });

  useQuery(
    `peformance_${performanceId}`,
    () => getPerformerPerformanceIdId(performanceId),
    {
      enabled: !!performanceId,
      onSuccess: res => {
        setPerformanceDataForm(s => ({ ...s, ...res }));
      },
    },
  );

  const deletePerformance = useMutation(deletePerformerPerformanceIdId, {
    onSuccess: () => history.replace('/'),
  });

  useQuery(
    `peformance_${performanceId}_categories`,
    () => getPerformerPerformanceIdIdCategories(performanceId),
    {
      enabled: !!performanceId,
      onSuccess: categories =>
        setPerformanceDataForm(s => ({ ...s, categories })),
    },
  );

  const handleDeletePerformance = () => {
    deletePerformance.mutate(performanceData.id);
  };

  const handleNextStepChange = data => {
    const newState = {
      ...performanceData,
      ...data,
    };
    if (data) {
      if (data.participationPrice) {
        newState.price = data.participationPrice;
      }
    }
    setPerformanceDataForm({ ...newState });
    if (activeStep === 4) {
      // shedule performance and exit
      updatePerformance.mutate(
        {
          id: newState.id,
          data: { ...newState, state: 'published' },
        },
        {
          onSuccess: () => setShowShareModal(true),
        },
      );
      return;
    }
    setActiveStep(s => s + 1);
  };

  const saveAsDraft = () => {};
  const handleSaveAsDraft = () => {
    childRef.current.saveChild(() => setIsDraftModalOpen(true));
  };
  const openDeleteConfirm = () => setDeletePF(true);
  const handleBack = () => setActiveStep(s => s - 1);

  const share = {
    url: `${config.CLIENT_URL}/performlive/${
      performanceData.id
    }/performer/${_get(performanceData, 'performer.id')}`,
    title: `Check out my Live on PerformLive! Join me on PerformLive!`,
    hashtags: [
      'performlive',
      'iperformwithPL',
      'streamingonPL',
      'createandperform',
      'performlivePL',
      'performlivetalent',
    ],
  };

  const steps = [
    CreatePerformanceForm,
    AddProducts,
    PreviewPerformance,
    Summary,
  ];

  const Component = steps[activeStep - 1];

  return (
    <div className="performancescheduler-container">
      <div className="schedule-container">
        <PerformanceSideBar activeStep={activeStep} />

        <Component
          performanceData={performanceData}
          onNextClick={handleNextStepChange}
          saveAsDraft={saveAsDraft}
          onBack={handleBack}
          performanceId={performanceId}
          onEditClick={setActiveStep}
          from="createPerformance"
          ref={childRef}
        />

        <div className="action-btns">
          <Button
            size="large"
            background="transparent"
            fontSize="12px"
            className="save"
            border="gradient"
            onClick={handleSaveAsDraft}
            disabled={activeStep > 3}
          >
            save draft
          </Button>
          <Button
            background="pink"
            className="circle-btn delete"
            onClick={openDeleteConfirm}
            disabled={!performanceData.id}
          >
            <img src={BasketIcon} alt="basket icon" />
          </Button>
        </div>

        {showShareModal && (
          <SocialShareModal
            onClose={() => history.push('/')}
            share={share}
            title="Your performance is scheduled!"
            subtitle="Share it now to get a bigger audience"
          />
        )}

        {deletePF && (
          <AlertModal
            heading="Delete this performance?"
            description="If you delete this performance, all data about it will be erased. This action can't be undone."
            confirmCallBack={handleDeletePerformance}
            cancelCallBack={() => setDeletePF(false)}
          />
        )}
        {isDraftModalOpen && (
          <AlertModal
            heading="Draft saved"
            description="Draft will appear in your profile and you can come back later to finish."
            confirmBtn={false}
            cancelText="Close"
            cancelCallBack={() => {
              history.push('/');
            }}
          />
        )}
      </div>
      <img className="lines-layer" src={LinesImg} alt="lines" />
      <img className="ellipse-layer" src={EllipseImg} alt="ellipse" />
    </div>
  );
};

PerformanceScheduler.propTypes = {};

const withReducer = injectReducer({
  key: 'performancescheduler',
  reducer,
  blacklist: [
    'performanceScheduleSuccess',
    'uploadPreviewUrl',
    'performanceCoverUrl',
    'isTagAvailable',
    'saveAsDraftSuccess',
    // 'activePerformance',
  ],
});
const withSaga = injectSaga({ key: 'performancescheduler', saga });

export default compose(
  withReducer,
  withSaga,
)(PerformanceScheduler);
