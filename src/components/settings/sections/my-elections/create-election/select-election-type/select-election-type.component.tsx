import { IconDefinition, faCheckToSlot, faEarth, faGlobe, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import SectionContainer from '../../../section-container/section-container.component';
import './select-election-type.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../../common/button/button.component';
import { useState } from 'react';
import ShowTimer from '../../../../../base/show-timer/show-timer.component';

const SelectOption = ({ title, description, icon, index, selected }: { title: string, description: string, icon: IconDefinition, index: number, selected: any }) => {
  return <ShowTimer timeout={70 * index}>
    <div onClick={() => { selected.set(index) }} className={`select-option${selected.value == index ? ` selected` : ``}`}>
      <div className="tick"></div>
      <div className="icon-container">
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      </div>
      <div className="info">
        <p className='title'>{title}</p>
        <p className='description'>{description}</p>
      </div>
    </div>
  </ShowTimer>
}

const SelectElectionType = ({ phase, selected }: { phase: { value: number, set: any }, selected: { value: number | null, set: any } }) => {
  return <>
    <h1>Choose election type</h1>
    <SelectOption title="Online election" description="I'm setting up this election to be online" icon={faEarth} index={0} selected={selected}></SelectOption>
    <SelectOption title="Anonymous Hybrid election" description="I'm setting up an anonymous hybrid election" icon={faUserSecret} index={1} selected={selected}></SelectOption>
    <SelectOption title="Full Hybrid election" description="I'm setting up a full hybrid election" icon={faCheckToSlot} index={2} selected={selected}></SelectOption>
    <ShowTimer timeout={280}><Button onClick={() => phase.set((prevPhase: number) => prevPhase + 1)} disabled={selected.value == null}>Next</Button></ShowTimer>
  </>
}

export default SelectElectionType;