import './input-election-info.css'
import { useState } from 'react';
import Input from '../../../../../common/input/input.component';
import TextField from '../../../../../common/text-field/text-field.component';
import DatePick from '../../../../../common/date-picker/date-picker.component';
import AntTagsSelector from '../../../../../antd/tags-selector/tags-selector.component';
import ShowTimer from '../../../../../base/show-timer/show-timer.component';
import Button from '../../../../../common/button/button.component';
import { IElection } from '../../../../../../interfaces';

interface IProps {
  title: { value: string, set: any },
  description: { value: string, set: any },
  date: { value: any, set: any },
  candidates: { value: IElection.Candidate[], set: any },
  phase: { value: number, set: any }
}

const InputElectionInfo = ({ title, description, date, candidates, phase }: IProps) => {
  return <>
    <h1>Fill out these information</h1>
    <ShowTimer timeout={0}><Input controlled={title} label='Title'></Input></ShowTimer>
    <ShowTimer timeout={70}><TextField controlled={description} label='Description'></TextField></ShowTimer>
    <ShowTimer timeout={140}><DatePick controlled={date} label={`Date`}></DatePick></ShowTimer>
    <ShowTimer timeout={210}><AntTagsSelector controller={candidates} name='candidates-select' label='Choose candidates' placeholder='XXXX-XXXX-XXXX-XXXX' tagsList={[{ value: `test`, label: `test` }]}></AntTagsSelector ></ShowTimer>
    <ShowTimer timeout={280}><Button onClick={() => phase.set((prevPhase: number) => prevPhase + 1)} disabled={title.value == '' || description.value == '' || date.value == null || candidates.value.length == 0}>Next</Button></ShowTimer>
  </>
}

export default InputElectionInfo;