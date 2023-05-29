import './votes-table.css'
import { useEffect, useState } from 'react';
import PageCounter from './page-counter/page-counter.component';
// import getPageCount from '../../../customHooks/page.hook';
// import { getElectionData } from '../../../services/elections';
// import { paillerDecrypt } from '../../../services/paillier';
import { IElection } from '../../../interfaces';

interface IProps {
    uuid: any,
    candidates: IElection.Candidate[],
    keyPair: any,
    votesList: any,
    endDate: any,
}

const VotesTable = ({ uuid, candidates, keyPair, votesList, endDate }: IProps) => {
    const [currentPageNum, setCurrentPageNum] = useState(0)

    // const hasFinished = () => {
    //     return Date.now() >= endDate
    // }

    // const { totalPages, itemPos } = getPageCount({ itemsNum: votesList.length, currentPageNum, itemsPerPage: 5 })

    return <div id="votes-table" className='food-table-container'>
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <td><p>Public Key</p></td>
                        {
                            candidates.map(candidate => {
                                return <td><p>{candidate.name}</p></td>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* {votesList.map((vote, i) => {
                        return (i >= itemPos && i < itemPos + 5) && <tr key={`${vote.publicKey}${i}`}>
                            <td key={Math.floor(Math.random() * 10000000).toString()}><p>{vote.publicKey?.replaceAll(`"`, ``)}</p></td>
                            {
                                candidates.map((candidate, i) => <td key={Math.floor(Math.random() * 10000000).toString()} ><p>{hasFinished()? paillerDecrypt(vote[`c_${candidate.publicKey}`], keyPair.publicKey, keyPair.privateKey).toString() : vote[`c_${candidate.publicKey}`]}</p></td>)
                            }
                        </tr>
                    })} */}
                </tbody>
            </table>
        </div>
        <div className='footer'>
            <PageCounter currentPageNum={currentPageNum} setCurrentPageNum={setCurrentPageNum} totalPages={0}></PageCounter>
        </div>
    </div>
}

export default VotesTable;