import React, { useState, useCallback } from 'react';
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
  const [dialogueProps, setDialogueProps] = useState({ message: { title: '', body: '' }, callback: () => {} }); // prettier-ignore
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addedPlaces, setAddedPlaces] = useState([]);

  const showToast = obj => setToastMessage(obj);
  const showDialogue = obj => setDialogueProps(obj);
  const resetAddedPlaces = () => setAddedPlaces([]);

  const onToggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      document.body.classList.remove('no-scroll__mobile');
    } else {
      setIsSidebarOpen(true);
      document.body.classList.add('no-scroll__mobile');
    }
  };

  // prettier-ignore
  const checkIsAdded = useCallback(id => {
    if (!addedPlaces) return false;
    const addedPlaceIds = addedPlaces.map(place => place.id);
    return addedPlaceIds.some(item => item === id);
  }, [addedPlaces]);

  const onAddPlace = useCallback(placeToAdded => {
    setAddedPlaces(places => [...places, placeToAdded]);
  }, []);

  // prettier-ignore
  const onRemovePlace = useCallback(placeToRemove => {
      setAddedPlaces(addedPlaces.filter(place => place.id !== placeToRemove.id));
    }, [addedPlaces]);

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

      <Route exact path="/">
        <Home
          onAddPlace={onAddPlace}
          onRemovePlace={onRemovePlace}
          checkIsAdded={checkIsAdded}
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
