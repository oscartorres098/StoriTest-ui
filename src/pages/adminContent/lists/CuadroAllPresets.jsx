import React from 'react'
import imgDefaultUser from '../../../assets/images/programador.png';
import './AllPresets.css'
import { Button } from '../../../components/Shared/Button';
import { useSendMail } from '../../../hooks/Mail';

function CuadroAllPresets(props) {

    const { presets } = props;
    const { sendEmail } = useSendMail({});
    const dispositionFiles = presets.files.map((file)=>{
        return {...file, disposition: "attachment"}
    })
    const handleSubmit = ()=>{
        sendEmail({to: presets.listId, subject: presets.subject, title: presets.title, body:  presets.body, attachments: dispositionFiles})
    }
    return (
        <div className='cuadroInfo sombra2' >
            <div className='name-container'>
                <div className="client-name">
                    <span>{presets.subject}</span>
                </div>
            </div>
            <div className='img-container'>
                <img className='imgUser' src={imgDefaultUser} alt="usuario" />
            </div>
            <div className='content-container'>
                <p><strong>Title: </strong> {presets.title}<br /></p>
                <p><strong>Body: </strong> {presets.body}<br /></p>

                <p><strong>Attached: </strong> {presets.files.length}<br /></p>

            </div>
            <Button
                buttonClassName="button-signup-first-step"
                onClick={handleSubmit}
                children="Send"
            />
        </div>
    )
}


export { CuadroAllPresets };