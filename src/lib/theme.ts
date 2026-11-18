/** Скрипт до отрисовки: тема из localStorage или системной настройки — без мигания */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('fb_theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;
