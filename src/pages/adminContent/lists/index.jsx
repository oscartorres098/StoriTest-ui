import React from 'react';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { CuadroAllPresets } from './CuadroAllPresets';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useGetPreset } from "../../../hooks";
import { Button } from '../../../components/Shared/Button';
function AllPresets() {
  const { getUsers, loading, data, error } = useGetPreset();
  const history = useHistory();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="assistant-header" >
        <ContentHeader text="Lists" />
      </div>
      <div className='profile' style={{ display: 'flex', gap: '20px', rowGap: '40px', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center', padding: '20px' }} >
        {data && data.map(
          option =>
            <div key={option.name}>
              <CuadroAllPresets
                presets={option}

              /></div>
        )}
        <Button
          buttonClassName="button-signup-first-step  floating-button"
          onClick={()=>history.push(`/Admin/Presets-Create`)}
          children="Create New Preset"
        />
      </div>
    </>
  );
}

export { AllPresets };
