import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';

import { Home, Signin, Signup, NovelManage, CreateNovel, EditNovel, EditUser, NovelDetail, CreateEpisode, EditEpisode } from './pages';
import { Navbar } from './components';
import { useUser } from './services/query';

const App = () => {
    useQueryClient();
    const { mutate } = useUser();
    const { auth } = useSelector(state => state);

    useEffect(() => {
        mutate();
    }, [mutate]);

    const privateRoutes = [
        { path: "/editepisode/:novelId/:episodeNumber", component: EditEpisode },
        { path: "/createepisode/:novelId", component: CreateEpisode },
        { path: "/detail/:novelId", component: NovelDetail },
        { path: "/profile", component: EditUser },
        { path: "/editnovel/:novelId", component: EditNovel },
        { path: "/createnovel", component: CreateNovel },
        { path: "/manage", component: NovelManage },
        { path: "/", component: Home },
    ];

    const publicRoutes = [
        { path: "/signin", component: Signin },
        { path: "/signup", component: Signup },
        { path: "/", component: Home },
    ];

    return (
        <>
            <Navbar />

            <Routes>
                {auth.user &&
                    privateRoutes.map((el, index) => <Route key={index} path={el.path} element={<el.component />} />)}

                {!auth.user &&
                    publicRoutes.map((el, index) => <Route key={index} path={el.path} element={<el.component />} />)}

                <Route
                    path="*"
                    element={<Home />}
                />
            </Routes>
        </>
    );
};

export default App;
