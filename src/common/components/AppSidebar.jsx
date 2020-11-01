import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AppSidebar.scss';
import AppSidebarNewList from './AppSidebarNewList';
import AppSidebarMyLists from './AppSidebarMyLists';
import MenuList from './MenuList';
import MENUS from '../constants/MENUS.json';

// prettier-ignore
function AppSidebar({ isOpen, addedPlaces, resetAddedPlaces, onRemovePlace, showToast, showDialogue }) {
  const [menu, setMenu] = useState(MENUS[0]);
  const [listName, setListName] = useState('');
  const [myLists, setMyLists] = useState([]);
  
  // Helpers
  const onSaveListEffect = () => {
    setListName('');
    resetAddedPlaces();
    showToast({ title: MENUS[0], body: `'${listName || '제목 없음'}'이(가) 저장되었습니다.`});
  };

  // Handlers
  const handleMenu = e => setMenu(e.target.innerText);
  const handleListName = e => setListName(e.target.value);
  
  const onSaveList = () => {
    if (addedPlaces.length === 0) return showToast({ title: MENUS[0], body: '리스트에 추가된 장소가 없습니다.'});
    const newList = {
      name: listName || '제목 없음',
      places: addedPlaces,
      date: new Intl.DateTimeFormat(undefined, { month: '2-digit', day: '2-digit', hour: '2-digit' }).format(new Date()), // prettier-ignore
      id: new Date().getTime(),
    };
    setMyLists(current => [...current, newList]);
    onSaveListEffect();
  };

  const removeList = (id, name) => {
    const callback = () => {
      setMyLists(myLists.filter(item => item.id !== id));
      showToast({ title: MENUS[0], body: `'${name}'이(가) 삭제되었습니다.`});
    };
    showDialogue({ message: {title: MENUS[1], body: `'${name}'을(를) 정말 삭제하시겠습니까?`}, callback });
  };

  return (
    <section className={`AppSidebar AppSidebar_${isOpen ? 'show' : 'hide'}`}>
      <header className="AppSidebar-header">
        <h2 className="visually-hidden">개인 메뉴</h2>
        <MenuList menus={MENUS} currentMenu={menu} handleClick={handleMenu} />
      </header>

      <section className="AppSidebar-main">
        <h3 className="visually-hidden">{menu}</h3>
        {(menu === MENUS[0]) && <AppSidebarNewList listName={listName} addedPlaces={addedPlaces} handleListName={handleListName} onRemovePlace={onRemovePlace} onSaveList={onSaveList} />}
        {(menu === MENUS[1]) && <AppSidebarMyLists myLists={myLists} removeList={removeList} />}
      </section>
    </section>
  );
}

AppSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  addedPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetAddedPlaces: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  showDialogue: PropTypes.func.isRequired,
};

export default AppSidebar;
