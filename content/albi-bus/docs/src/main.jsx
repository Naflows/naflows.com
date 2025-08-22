import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../public/styles/root.scss';
import Button from '../../src/modules/button';
import Container from './components/container';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="header">
        <Button text="hi" type="main"/>
        <Container 
          title="blabla" 
          description="blabla"
          code= {`
            const algus = new AlgusInstanceDirector({
                preciseSearch : true,
                printMethods : true,
                name : "Algus 1 - Tests",
                instanceList : ["agency"]
            });
          `}
        />
    </div>
  </React.StrictMode>,
)
