import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AppSidebar.css';
import AppSidebarNewList from './AppSidebarNewList';
import AppSidebarMyLists from './AppSidebarMyLists';
import Filter from './Filter';
import OPTIONS from '../constants/OPTIONS.json';

// prettier-ignore
const AppSidebar = ({ isOpen, addedPlaces, resetAddedPlaces, onRemovePlace, showToast, showDialogue }) => {
  const [option, setOption] = useState(OPTIONS[0]);
  const [listName, setListName] = useState('');
  const [myLists, setMyLists] = useState([]);
  
  // Helpers
  const onSaveEffect = () => {
    setListName('');
    resetAddedPlaces();
    showToast({ title: '내 리스트 목록', body: `'${listName || '제목 없음'}'이(가) 저장되었습니다.`});
  };

  // Handlers
  const handleOption = e => setOption(e.target.innerText);
  const handleListName = e => setListName(e.target.value);
  const onSaveList = () => {
    if (addedPlaces.length === 0) return showToast({ title: '새 리스트', body: '리스트에 추가된 장소가 없습니다.'});
    const newList = {
      name: listName || '제목 없음',
      places: addedPlaces,
      date: new Intl.DateTimeFormat(undefined, { month: '2-digit', day: '2-digit', hour: '2-digit' }).format(new Date()), // prettier-ignore
      id: new Date().getTime(),
    };
    setMyLists(current => [...current, newList]);
    onSaveEffect();
  };

  const removeList = (id, name) => {
    const callback = () => {
      setMyLists(myLists.filter(item => item.id !== id));
      showToast({ title: '새 리스트', body: `'${name}'이(가) 삭제되었습니다.`});
    }
    showDialogue({ message: {title: '내 리스트 목록', body: `'${name}'을(를) 정말 삭제하시겠습니까?`}, callback });
  };

  // Render component corresponding to current option.
  const renderAppSidebarContents = () => {
    if (option === OPTIONS[0])
      return (
        <AppSidebarNewList
          listName={listName}
          addedPlaces={addedPlaces}
          handleListName={handleListName}
          onRemovePlace={onRemovePlace}
          onSaveList={onSaveList}
        />
      );

    if (option === OPTIONS[1])
      return <AppSidebarMyLists myLists={myLists} removeList={removeList} />;
  };

  return (
    <section className={`AppSidebar AppSidebar_${isOpen ? 'show' : 'hide'}__mobile`}>
      <header className="AppSidebar-header">
        <h2 className="visually-hidden">개인 메뉴</h2>
        <Filter filters={OPTIONS} currentFilter={option} handleClick={handleOption} />
      </header>

      <section className="AppSidebar-main">
        <h3 className="visually-hidden">{option}</h3>
        {renderAppSidebarContents()}
      </section>
    </section>
  );
};

AppSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  addedPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetAddedPlaces: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  showDialogue: PropTypes.func.isRequired,
};

export default AppSidebar;
