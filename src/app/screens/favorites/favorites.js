import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery, useQueryClient, useMutation } from 'react-query';

import Discover from 'assets/svg/profile/discover.svg';
import { PERFORMANCE_STATUS } from 'app/app.constants.json';
import plToast from 'app/utils/toast';
import Loader from '../../components/Loader';
import { useApi, useIntersectionObserver } from '../../hooks';
import { ScrollTop } from '../../components';
import EmptyState from '../../components/EmptyState';
import Card from '../../components/Card';
import Button from '../../components/Common/Button';
import constants from './favorites.constants';

import SocialShareModal from '../../components/SociaShareModal/SocialShareModal';
import PerformancePreviewPopup from '../../components/PerformancePreviewPopup';
import { getPastShareLink } from '../../utils/share';

import './favorites.scss';

const quantityOfCard = constants.QUANTITY_OF_CARDS;

export const Favorites = () => {
  const history = useHistory();
  const queryClient = useQueryClient();

  const [spinner, setSpinner] = useState(true);
  const [sharePerformance, setSharePerformance] = useState(null);
  const [registerForpaidPerformance, setRegisterForpaidPerformance] = useState(
    null,
  );
  const [clickedPerfomanceData, setClickedPerfomanceData] = useState(null);

  const {
    getPerformerPerformanceLikedByMe,
    postPerformerPerformanceIdIdRegister,
  } = useApi('performer');

  const registerToFreePerformance = useMutation(
    postPerformerPerformanceIdIdRegister,
  );

  const {
    data: favoritesDataPagesArray,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'favorites',
    ({ pageParam = 0 }) =>
      getPerformerPerformanceLikedByMe(pageParam, quantityOfCard, true),
    {
      getPreviousPageParam: firstPage => firstPage.previousId,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === quantityOfCard ? allPages.length - 1 : false,
      onSuccess: () => {
        if (!spinner) {
          return;
        }
        setSpinner(false);
      },
    },
  );

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const onLikeDislikeClick = async () => {
    setSpinner(true);
    await queryClient.invalidateQueries('favorites');
    setSpinner(false);
  };

  const handleClosePaidPerformanceModal = () => {
    setRegisterForpaidPerformance(null);
  };

  const handleJoin = performanceData => {
    const { participationPaid, isPaid } = performanceData;

    if (!participationPaid || isPaid) {
      history.push(
        `/performlive/${performanceData.id}/performer/${
          performanceData.performer.id
        }`,
      );
    } else {
      setRegisterForpaidPerformance(performanceData);
    }
  };

  const handleRegister = performanceData => {
    const { participationPaid, registeredByMe, id } = performanceData;
    if (registeredByMe) return;
    if (!participationPaid) {
      registerToFreePerformance.mutate(id, {
        onError: res => plToast.error(res.data.message),
      });
    } else {
      setRegisterForpaidPerformance(performanceData);
    }
  };

  const returnHome = () => {
    history.push(`/`);
  };

  const perfomanceCardPropsDependsOnType = type =>
    ({
      [PERFORMANCE_STATUS.LIVE]: { handleJoin },
      [PERFORMANCE_STATUS.PUBLISHED]: {
        handleRegister,
        handleCardClick: setClickedPerfomanceData,
      },
      [PERFORMANCE_STATUS.PAST]: {},
    }[type]);

  const renderFavorites = item => (
    <Card
      key={item.id}
      performanceData={{ ...item, liked: true }}
      type={item.state}
      onLikeDislikeClick={onLikeDislikeClick}
      onShare={
        item.performer && item.performer.id
          ? () => setSharePerformance(item)
          : undefined
      }
      {...perfomanceCardPropsDependsOnType(item.state)}
    />
  );

  const pagesRender = (page, index) => (
    <React.Fragment key={page[0].id + index}>
      {page && page.length ? page.map(renderFavorites) : null}
    </React.Fragment>
  );

  const share = sharePerformance && {
    url: getPastShareLink(
      sharePerformance.id,
      sharePerformance.performer.id,
      sharePerformance.state,
    ),
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

  return (
    <div className="favorites-container">
      <h1 className="title">Favorites</h1>

      {registerForpaidPerformance && (
        <RegisterForPaidPerformanceModal
          performance={registerForpaidPerformance}
          onClose={handleClosePaidPerformanceModal}
        />
      )}
      {spinner && <Loader />}
      <div className="content">
        {favoritesDataPagesArray && favoritesDataPagesArray.pages[0].length ? (
          <>
            <div className="cards">
              {favoritesDataPagesArray.pages.map(pagesRender)}
            </div>
            {hasNextPage && (
              <div ref={loadMoreButtonRef} className="loadmore-btn-container">
                <Button
                  size="medium-large"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage && 'Loading more...'}
                  {!isFetchingNextPage && hasNextPage
                    ? 'Load more'
                    : 'Nothing more to load'}
                </Button>
              </div>
            )}
            <ScrollTop />
          </>
        ) : (
          <div className="isEmpty">
            <EmptyState
              title="No favorites yet"
              subtitle="Add your favorite performances so you don’t miss them"
              btnIcon={Discover}
              buttonText="Browse performances"
              onClick={returnHome}
            />
          </div>
        )}
      </div>

      {sharePerformance && (
        <SocialShareModal
          onClose={() => setSharePerformance(null)}
          title="Share to"
          subtitle="Share this Performance with your friends!"
          share={share}
        />
      )}
      {clickedPerfomanceData && (
        <PerformancePreviewPopup
          performanceData={clickedPerfomanceData}
          onClose={() => setClickedPerfomanceData(null)}
        />
      )}
    </div>
  );
};

Favorites.propTypes = {};

export default Favorites;
