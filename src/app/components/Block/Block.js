import React, { useEffect, useState } from 'react';
import DropDownBtn from './Common/DropDownBtn';
import BlockDialog from './Common/BlockDialog';
import IMG from '../../utils/images';
import PropTypes from 'prop-types';
import './Block.scss';
import ReportDialog from './Common/ReportDialog';
import useAudience from '../../screens/performAgora/hooks/useAudience';

const Block = props => {
  const {
    from = 'profile',
    message = '',
    userInfo,
    values,
    direction,
    where = '',
    performInfo = {},
    handleShareProfile = () => {},
    handleOpenDialog = () => {},
    handleCloseDialog = () => {},
    OpenPerformReport = () => {},
  } = props;

  const audienceHook = useAudience();
  const [open, setOpen] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openReportComment, setOpenReportComment] = useState(false);

  const handleSelect = type => {
    if (type == 'Share profile') {
      handleShareProfile();
    }
    if (type == 'Report comment') {
      setOpenReportComment(true);
      setOpenReport(false);
    }
    if (type == 'Block user') {
      setOpenBlock(true);
    }
    if (type == 'Report user') {
      setOpenReport(true);
      setOpenReportComment(false);
      handleOpenDialog();
    }
    if (type == 'Report') {
      if (where == 'perform') {
        OpenPerformReport();
      } else {
        setOpenReport(true);
        handleOpenDialog();
      }
    }
    setOpen(false);
  };
  return (
    <>
      <div className="card__block">
        <button
          className="dropBtn"
          onClick={e => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <img
            src={
              from == 'audience'
                ? IMG.THREE_DOTS
                : from == 'chat'
                  ? IMG.THREE_DOTS_WHITE
                  : IMG.DROPDOWN
            }
          />
        </button>
        {open && (
          <DropDownBtn
            values={values}
            direction={direction}
            onClick={(item, e) => {
              e.stopPropagation();
              handleSelect(item);
            }}
            onClickOut={() => {
              setOpen(false);
            }}
          />
        )}
      </div>
      {openBlock && (
        <BlockDialog
          heading={
            userInfo.stageName
              ? userInfo.stageName
              : userInfo.displayName
                ? userInfo.displayName
                : userInfo.firstName + ' ' + userInfo.lastName
          }
          userInfo={userInfo}
          from={from}
          confirmCallBack={() => {
            setOpenBlock(false);
            handleCloseDialog();
            audienceHook.updateLeaveStateFB(false, true);
          }}
          cancelCallBack={() => {
            setOpenBlock(false);
            handleCloseDialog();
          }}
        />
      )}
      {(openReport || openReportComment) && (
        <ReportDialog
          heading="Report"
          confirmCallBack={() => {
            setOpenReport(false);
            setOpenReportComment(false);
            handleCloseDialog();
          }}
          cancelCallBack={() => {
            setOpenReport(false);
            setOpenReportComment(false);
            handleCloseDialog();
          }}
          from={from}
          message={message}
          userInfo={userInfo}
          performInfo={performInfo}
          account={openReport}
          comment={openReportComment}
        />
      )}
    </>
  );
};

Block.propTypes = {
  from: PropTypes.string,
  message: PropTypes.string,
  userInfo: PropTypes.object,
  values: PropTypes.array,
  direction: PropTypes.string,
  where: PropTypes.string,
  performInfo: PropTypes.object,
  handleShareProfile: PropTypes.func,
  handleOpenReport: PropTypes.func,
  handleOpenDialog: PropTypes.func,
  OpenPerformReport: PropTypes.func,
};

export default Block;
