import './programs-pdf.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IElection } from '../../../interfaces';
import { QRCode } from 'antd';

export const downloadPdf = () => {
    const input: any = document.getElementById('pdf-content');
    html2canvas(input)
        .then((canvas: any) => {
            let imgWidth = 208;
            let imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save("downloads.pdf");
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            const printWindow: any = window.open(url);
            printWindow.addEventListener('load', function () {
                printWindow.print();
            }, true);
        })
};

const VotePDF = ({ election, random }: { election: IElection.Election, random: number | null }) => {
    const candidates = election.candidates;
    return <div className='pdf-container'>
        <div id="pdf-content">
            <div className='header'>
                <h1>VOTING BALLOT</h1>
                <p>This document shows the required details to complete your vote</p>
            </div>
            <div className='body'>
                <h1 className='sub-title'>Validation Code</h1>
                <div className='patient-information'>
                    <QRCode value={`${candidates.map(candidate => `${candidate.selected ? candidate.name.replace(`,`, ``) : ``} `)}${random}`}></QRCode>
                </div>
                <h1 className='sub-title'>Your votes</h1>
                <div className='weekly-meals'>
                    <div className="info-container">
                        <p className='note'>🗳️ {election.title} | {election._id}</p>
                        <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        {candidates.map(candidate => <td>{candidate.name}</td>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {candidates.map(candidate => <td>{candidate.selected ? `Voted` : `-`}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

export default VotePDF;