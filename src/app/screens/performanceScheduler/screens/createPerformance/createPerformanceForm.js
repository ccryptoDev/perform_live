import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { FormikProvider, useFormik } from 'formik';
import { object, string, number, date, array } from 'yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import cn from 'classnames';
import moment, { min } from 'moment';
import _ from 'lodash';

import '../../performanceScheduler.scss';
import './createPerformance.scss';
import PotentialEarningIcon from '../../../../../assets/svg/potential-earning.svg';
import 'react-calendar/dist/Calendar.css';
import Category from '../../../../components/Category/Category';
import { IMG } from '../../performanceScheduler.dependencies';
import { PerformanceFooter } from '../../components/PerformanceFooter/PerformanceFooter';
import plToast from '../../../../utils/toast';
import { ControledLabeledInput } from '../../../../components/LabeledInput/LabeledInput';
import { ControledLabeledTextArea } from '../../../../components/LabeledTextArea/LabeledTextArea';
import { ControlledLabeledDateInput } from '../../../../components/LabeledDateInput/LabeledDateInput';
import { ControledLabeledTimePicker } from '../../../../components/LabeledTimePicker/LabeledTimePicker';
import { ControlledDropdown } from '../../../../components/Dropdown/Dropdown';
import { ControlledToggleButton } from '../../../../components/ToggleButton/ToggleButton';
import useApi from '../../../../hooks/api';
import { usePerformancePurchasesType } from '../../../../hooks/usePerformancePurchasesType.query';
import Button from '../../../../components/Common/Button';
import PlusIcon from '../../../../../assets/svg/btns/plus.svg';
import MinusIcon from '../../../../../assets/svg/btns/minus.svg';

const schema = object().shape({
  name: string().required('Enter name'),
  details: string().required('Enter details'),
  start: date().min(new Date(), 'Must be in future'),
  maxAudienceSize: number()
    .integer('Should be integer')
    .max(50, 'Max 50'),
  stageLimit: number()
    .integer('Should be integer')
    .max(10, 'Max 10'),
  giftPurchasesIds: array().when('giftEnabled', {
    is: true,
    then: array().min(1, 'If gift enabled should have at least one option'),
  }),
});

const GiftPriceButton = ({ price, selectedPrice, onSelect, disabled }) => {
  return (
    <button
      className={cn('tab-list', {
        'gift-price-active': selectedPrice,
      })}
      onClick={() => onSelect(price)}
      type="button"
      disabled={disabled}
    >
      $ {price.price}
    </button>
  );
};

const CreatePerformanceForm = forwardRef(
  ({ performanceData, onNextClick }, ref) => {
    const queryClient = useQueryClient();
    const formik = useFormik({
      validationSchema: schema,
      initialValues: performanceData,
      enableReinitialize: true,
      onSubmit: () => {},
    });
    const {
      postPerformerPerformance,
      putPerformerPerformanceIdId,
      getPerformanceCategories,
    } = useApi('performer');

    const { data: categoryList = [] } = useQuery(
      'performanceCategories',
      getPerformanceCategories,
    );

    const { options: giftPrices } = usePerformancePurchasesType('gift');
    const { dropdownOptions: stagePrices } = usePerformancePurchasesType(
      'stage',
    );
    const {
      dropdownOptions: accessPrices,
      options: participationPurchases,
    } = usePerformancePurchasesType('access');
    const [isScheduleOpen, setIsScheduleOpen] = useState(true);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isMonetizationOpen, setIsMonetizationOpen] = useState(false);

    useEffect(
      () => {
        if (formik.values.participationPurchaseId === undefined) {
          const free = accessPrices.find(
            el => el.label.toLowerCase() === 'free',
          );
          if (free) {
            formik.setFieldValue('participationPurchaseId', free.value);
          }
        }
      },
      [accessPrices],
    );

    const createPerformance = useMutation(data =>
      postPerformerPerformance(data),
    );
    const updatePerformance = useMutation(({ id, data }) =>
      putPerformerPerformanceIdId(id, data),
    );

    const updateTimeField = (timeFrom, date) => {
      if (timeFrom === 'start') {
        formik.setFieldValue(
          'end',
          moment(date)
            .add(1, 'hour')
            .toDate(),
        );
      } else {
        formik.setFieldValue(
          'start',
          moment(date)
            .subtract(1, 'hour')
            .toDate(),
        );
      }
    };

    const updateFormCategories = data => {
      const newValue = _.xor(formik.values.categories, [data]);
      formik.setFieldValue('categories', newValue);
    };

    const handleAddNewCategory = e => {
      if (e.key === 'Enter') {
        const newCatValue = e.target.value.toLowerCase();
        const currentCategories = formik.values.categories;

        queryClient.setQueryData('performanceCategories', () => [
          ...categoryList,
          newCatValue,
        ]);
        formik.setFieldValue('categories', [...currentCategories, newCatValue]);
        formik.setFieldValue('customCategory', '');
      }
    };

    const handleStepChange = onSuccess => () => {
      formik.submitForm(); // set all fields touched
      if (formik.isValid) {
        let {
          startTime,
          endTime,
          startDate,
          endDate,
          ...payload
        } = formik.values;

        const participationPurchase = participationPurchases.find(
          el => el.id === payload.participationPurchaseId,
        );
        if (participationPurchase) {
          payload.participationPaid = !!+participationPurchase.price;
        }
        payload.maxAudienceSize = payload.maxAudienceSize || undefined;

        if (!performanceData.id) {
          createPerformance.mutate(payload, {
            onSuccess: res => onSuccess({ ...payload, ...res }),
            onError: res => plToast.error(res.data.message),
          });
        } else {
          updatePerformance.mutate(
            { id: performanceData.id, data: payload },
            {
              onSuccess: res => onSuccess({ ...payload, ...res }),
              onError: res => plToast.error(res.data.message),
            },
          );
        }
      } else {
        plToast.error(Object.values(formik.errors).join(', '));
      }
    };

    useImperativeHandle(ref, () => ({
      saveChild(cb) {
        handleStepChange(cb)();
      },
    }));

    const [addCategoryOpen, setAddCategoryOpen] = useState(false);

    const handleGiftSelect = price => {
      const newValue = _.xor(formik.values.giftPurchasesIds, [price.id]);
      formik.setFieldValue('giftPurchasesIds', newValue);
    };

    return (
      <FormikProvider value={formik}>
        <div className="content create-performance">
          <div className="card">
            <div className="card-detail">
              <div className="card__header">
                <h2 className="h2">Description and schedule</h2>
                <Button
                  type="secondary"
                  background="transparent"
                  suffix={
                    <img
                      src={isScheduleOpen ? MinusIcon : PlusIcon}
                      alt="plus icon"
                    />
                  }
                  className="circle-btn"
                  onClick={() => setIsScheduleOpen(s => !s)}
                />
              </div>
              {isScheduleOpen && (
                <>
                  <ControledLabeledInput
                    label="Performance Name"
                    maxLength={35}
                    name="name"
                  />

                  <ControledLabeledTextArea
                    label="Description"
                    maxLength={400}
                    name="details"
                    rows="5"
                  />

                  <div className="date-group">
                    <ControlledLabeledDateInput label="Date" name="start" />
                    <div className="time-picker-group">
                      <ControledLabeledTimePicker
                        name="start"
                        onChange={data => updateTimeField('start', data)}
                        label="Start time"
                      />
                      <div className="border-line" />

                      <ControledLabeledTimePicker
                        name="end"
                        label="End time"
                        onChange={data => updateTimeField('end', data)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-category">
              <div className="card__header">
                <h2 className="h2">Category</h2>
                <Button
                  type="secondary"
                  background="transparent"
                  suffix={
                    <img
                      src={isCategoryOpen ? MinusIcon : PlusIcon}
                      alt="plus icon"
                    />
                  }
                  className="circle-btn"
                  onClick={() => setIsCategoryOpen(s => !s)}
                />
              </div>
              {isCategoryOpen && (
                <>
                  <Category
                    categories={categoryList}
                    onSelect={updateFormCategories}
                    selectedCategories={formik.values.categories}
                  />

                  <div className="search-option">
                    <div
                      className={
                        addCategoryOpen ? 'search-form' : 'search-form active'
                      }
                    >
                      <div className="text">
                        Didn’t find your category? Just add a new one:
                      </div>
                      <ControledLabeledInput
                        name="customCategory"
                        label="Category name"
                        maxLength={35}
                        placeholder="Add your category"
                        onKeyPress={handleAddNewCategory}
                      />
                    </div>
                    <div className="show-more">
                      <img
                        src={addCategoryOpen ? IMG.SHOW_LESS : IMG.SHOW_MORE}
                        className="more-less"
                        alt="show icon"
                        onClick={() => setAddCategoryOpen(!addCategoryOpen)}
                        role="none"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <div className="settings">
              <div className="card__header">
                <h2 className="h2">Monetization settings</h2>
                <Button
                  type="secondary"
                  background="transparent"
                  suffix={
                    <img
                      src={isMonetizationOpen ? MinusIcon : PlusIcon}
                      alt="plus icon"
                    />
                  }
                  className="circle-btn"
                  onClick={() => setIsMonetizationOpen(s => !s)}
                />
              </div>
              {isMonetizationOpen && (
                <>
                  <div className="audience">
                    <ControledLabeledInput
                      name="maxAudienceSize"
                      label="Audience"
                      type="number"
                    />
                    <span className="attend-text">
                      people can attend your performance for{' '}
                    </span>
                    <ControlledDropdown
                      name="participationPurchaseId"
                      options={accessPrices}
                    />
                  </div>

                  <div className="border-line" />

                  <div className="amount">
                    <div className="allow-group">
                      <ControlledToggleButton name="giftEnabled" />
                      <span className="stage-text">Allow receiving gifts</span>
                    </div>

                    <div className="gifts-per">
                      People will be able to send you gifts during the
                      performance.
                    </div>

                    <div className="create-performance__tabs">
                      {giftPrices.map(price => (
                        <GiftPriceButton
                          price={price}
                          key={price.id}
                          selectedPrice={
                            formik.values.giftPurchasesIds.indexOf(price.id) !==
                            -1
                          }
                          onSelect={handleGiftSelect}
                          disabled={!formik.values.giftEnabled}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="border-line" />
                  <div className="allow">
                    <ControlledToggleButton name="stageEnabled" />
                    <span className="stage-text">
                      Allow people to join the stage
                    </span>
                  </div>

                  <div className="person-group">
                    <ControledLabeledInput
                      name="stageLimit"
                      type="number"
                      disabled={!formik.values.stageEnabled}
                    />
                    <div className="person-text">
                      person can join the stage at one time for
                    </div>
                    <ControlledDropdown
                      name="stagePurchaseId"
                      options={stagePrices}
                      isDisabled={!formik.values.stageEnabled}
                    />
                  </div>

                  <div className="potential-earning">
                    <img src={PotentialEarningIcon} alt="potential-earnings" />
                    <span>Potentional earnings</span>
                    <span className="coming-soon">COMING SOON</span>
                  </div>
                  <div className="info">
                    Earnings may increase based on gifts from the audience
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <PerformanceFooter
          onNext={handleStepChange(onNextClick)}
          nextButtonText="Next: Select Products"
        />
      </FormikProvider>
    );
  },
);

CreatePerformanceForm.propTypes = {
  performanceData: PropTypes.object,
  onNextClick: PropTypes.func,
  saveAsDraft: PropTypes.bool,
  onError: PropTypes.func,
};

export default CreatePerformanceForm;
