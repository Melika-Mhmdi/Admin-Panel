
import s from './UnitsList.scss';
import { unitTypeNames } from '../../utils/unitHelpers';

const UnitsList = ({ units, onChange, selectedUnitId }) => {
  const renderUnit = unitData => {
    const clickHandler = e => {
      e.currentTarget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      onChange(unitData);
    };
    const isActive = unitData.id === selectedUnitId;
    return (
      <button
        className={cs(s.unit, isActive && s.active)}
        key={unitData.id}
        onClick={clickHandler}
      >
        <Radio checked={isActive} />
        <div className={s.info}>
          <h4>{`${unitTypeNames[unitData.unitType] || ''} ${
            unitData.name
          }`}</h4>
          <p>{`کد: ${unitData.code}`}</p>
        </div>
      </button>
    );
  };
  return (
    <div className={s.list}>
      <div>{units.map(unit => renderUnit(unit))}</div>
    </div>
  );
};


export default UnitsList;
