import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './common/styles/index.scss';
import './App.scss';
// components
import Toast from './common/components/Toast';
import Dialogue from './common/components/Dialogue';
import AppHeader from './common/components/AppHeader';
import AppSidebar from './common/components/AppSidebar';
import AppFooter from './common/components/AppFooter';
// template components
import Home from './pages/home/Home';
import About from './pages/about/About';

const App = () => {
  const [toastMessage, setToastMessage] = useState({ title: '', body: '' });
  const showToast = obj => setToastMessage(obj);
  const [dialogueProps, setDialogueProps] = useState({ message: { title: '', body: '' }, callback: () => {} }); // prettier-ignore
  const showDialogue = obj => setDialogueProps(obj);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const onToggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      document.body.classList.remove('no-scroll__mobile');
    } else {
      setIsSidebarOpen(true);
      document.body.classList.add('no-scroll__mobile');
    }
  };

  const [addedPlaces, setAddedPlaces] = useState([]);
  const resetAddedPlaces = () => setAddedPlaces([]);
  const onAddPlace = placeToAdded => {
    setAddedPlaces(places => [...places, placeToAdded]);
  };
  const onRemovePlace = placeToRemove => {
    setAddedPlaces(addedPlaces.filter(place => place.id !== placeToRemove.id));
  };

  return (
    <div className="App">
      <AppHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar}
        addedPlacesLength={addedPlaces.length}
      />

      <AppSidebar
        isOpen={isSidebarOpen}
        addedPlaces={addedPlaces}
        onRemovePlace={onRemovePlace}
        resetAddedPlaces={resetAddedPlaces}
        showToast={showToast}
        showDialogue={showDialogue}
      />

      {/* make <AppMain> when getting complicated. */}
      <Route exact path="/">
        <Home
          onAddPlace={onAddPlace}
          onRemovePlace={onRemovePlace}
          addedPlaceIds={addedPlaces && addedPlaces.map(place => place.id)}
          showToast={showToast}
        />
      </Route>
      <Route path="/about">
        <About />
      </Route>

      <AppFooter />

      <Toast message={toastMessage} />
      <Dialogue message={dialogueProps.message} callback={dialogueProps.callback} />
    </div>
  );
};

export default App;
