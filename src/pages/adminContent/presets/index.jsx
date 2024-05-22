import React from 'react';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { CuadroAllPresets } from './CuadroAllPresets';

function AllPresets() {

    const asistentes = [
        {
          Name: "ruta/a/la/imagen1.jpg",
          Email: "Juan Pérez",
        },
      ];

    return (
        <>
          <div className="assistant-header" >
                <ContentHeader text="Assistants" />
          </div>
          <div className='profile' >
            {asistentes.map(
                option => <div key={option.Name}><CuadroAllPresets
                cliente = {option}
                /></div>
            )}
          </div>
        </>
    );
}

export { AllPresets };
