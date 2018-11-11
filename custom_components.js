const mainNavStyles = `.nav_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 4rem;
  height: 60vh;
}

.headline_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main_headline {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 2rem;
  color: #999;
}

.nav_link_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.nav_item {
  width: 10rem;
}

.nav_link {
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: #999;
}

.nav_link:hover {
  opacity: 0.7;
}`

class MainNav extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create skeleton
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class','nav_wrapper');

    const headlineWrapper = document.createElement('div');
    headlineWrapper.setAttribute('class','headline_wrapper');

    const navLinkWrapper = document.createElement('ul');
    navLinkWrapper.setAttribute('class','nav_link_wrapper');

    const headlineText = this.getAttribute('headline');
    const headlineLink = document.createElement('a');
    headlineLink.setAttribute('class','main_headline');
    headlineLink.setAttribute('href', './index.html')
    headlineLink.textContent = headlineText
    headlineWrapper.appendChild(headlineLink)


    const rawLinks = this.getAttribute('links');
    const linksArray = rawLinks.split(',')

    linksArray.forEach((linkText) => {
      const navItem = document.createElement('li');
      const navLink = document.createElement('a');
      navItem.appendChild(navLink);
      navLinkWrapper.appendChild(navItem);
      let navItemClasses = ['nav_item']
      if (window.location.pathname.includes(linkText)) navItemClasses = [...navItemClasses, 'active']
      navItem.setAttribute('class', navItemClasses.join(' '))
      navLink.setAttribute('class', `nav_link`)
      navLink.textContent = linkText
    })

    // Create some CSS to apply to the shadow dom
    var style = document.createElement('style');
    style.textContent = mainNavStyles

    shadow.appendChild(style);

    shadow.appendChild(wrapper);
    wrapper.appendChild(headlineWrapper);
    wrapper.appendChild(navLinkWrapper);
  }
}

customElements.define('main-nav', MainNav);
