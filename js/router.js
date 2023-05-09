export class Router {
  routes = {};

  add = (routeName, page) => {
    this.routes[routeName] = page;
  };

  route = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  };

  handle = () => {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes["/error"];

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });

    // prettier-ignore
    if (window.location.pathname == "/universe") {
      document.body.style.background = "url(../assets/bg-universe.png)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }

    // prettier-ignore
    else if (window.location.pathname == "/exploration") {
      document.body.style.background = "url(../assets/bg-exploration.png)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }

    // prettier-ignore
    else {
      document.body.style.background = "url(../assets/bg-home.png)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
  };
}
