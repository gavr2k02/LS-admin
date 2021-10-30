import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'preact/hooks';
import style from './style.module.scss';
import SignIn from './signIn';
import { api } from '../services/api';
import { Routes } from '../common/enums/Routes';
import SpinnerMain from '../components/spinner-main';
import Header from '../components/header';
import Home from './home';
import DownMenu from '../components/down-menu';
import Faculties from './faculties';
import Courses from './courses';
import Presets from './presets';
import { ITeacher } from 'models/interfaces/ITeacher';
import { useObservable } from '../common/utils/useObservable';
import Timetable from './timetable';

export default function App() {
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const teacher: ITeacher = useObservable(api.authService.userSubject);

  useEffect(() => {
    if (api.authService.isLoggedIn) {
      api.authService.subscribe(`${api.authService.cid}-user-${api.authService.user?.id}`);
      return () => {
        api.authService.unsubscribe(`${api.authService.cid}-user-${api.authService.user?.id}`);
      };
    }
  }, [setLoadingMain, setLoadingAuth]);

  const authToken = async () => {
    try {
      await api.authService.loginWithToken();
    } finally {
      setLoadingMain(false);
    }
  };

  if (loadingMain) {
    authToken();
    return <SpinnerMain />;
  } else {
    return api.authService.isLoggedIn ? (
      <>
        <div class={`${style.app} ${style.full}`}>
          <Header />
          <Switch>
            <Route path={Routes.HOME} component={() => <Home />} />
            <Route path={Routes.FACULTIES} component={() => <Faculties />} />
            <Route path={Routes.COURSES} component={() => <Courses />} />
            <Route path={Routes.PRESETS} component={() => <Presets />} />
            <Route path={Routes.CARDS} component={() => <Presets />} />
            <Route path={Routes.TIMETABLE} component={() => <Timetable />} />

            <Redirect from='/' to={Routes.HOME} />
          </Switch>
          <DownMenu />
        </div>
      </>
    ) : (
      <div class={`${style.app} ${style.full} ${style.sign}`}>
        <Switch>
          <Route path={Routes.SIGN_IN} component={() => <SignIn setLoad={setLoadingAuth} load={loadingAuth} />} />
          <Redirect from='/' to={Routes.SIGN_IN} />
        </Switch>
      </div>
    );
  }
}
