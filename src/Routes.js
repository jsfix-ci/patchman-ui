import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import WithPermission from './PresentationalComponents/WithPermission/WithPermission';
import { Bullseye, Spinner } from '@patternfly/react-core';

const PermissionRouter = (route) => {
    const {
        component: Component,
        isExact,
        path,
        props = {},
        requiredPermissions
    } = route;

    const routeProps = {
        isExact,
        path
    };

    const componentProps = {
        ...props,
        route: { ...route }
    };

    return (
        <Route {...routeProps}>
            <WithPermission requiredPermissions={requiredPermissions}>
                <Component {...componentProps} />
            </WithPermission>
        </Route>
    );
};

const Advisories = lazy(() =>
    import(
        /* webpackChunkName: "Advisories" */ './SmartComponents/Advisories/Advisories'
    )
);

const Systems = lazy(() =>
    import(
        /* webpackChunkName: "Systems" */ './SmartComponents/Systems/Systems'
    )
);

const InventoryDetail = lazy(() =>
    import(
        /* webpackChunkName: "InventoryDetail" */ './SmartComponents/SystemDetail/InventoryDetail'
    )
);

const AdvisoryPage = lazy(() =>
    import(
        /* webpackChunkName: "AdvisoryyPage" */ './SmartComponents/AdvisoryDetail/AdvisoryDetail'
    )
);

const PackagsPage = lazy(() =>
    import(
        /* webpackChunkName: "Packages" */ './SmartComponents/Packages/Packages'
    )
);

const PackageDetail = lazy(() =>
    import(
        /* webpackChunkName: "PackageDetail" */ './SmartComponents/PackageDetail/PackageDetail'
    )
);

const Templates = lazy(() =>
    import(
        /* webpackChunkName: "PackageDetail" */ './SmartComponents/PatchSet/PatchSet'
    )
);

export const paths = [
    {
        path: '/advisories',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: Advisories
    },
    {
        path: '/systems/',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: Systems
    },
    {
        path: '/systems/:inventoryId',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: InventoryDetail
    },
    {
        path: '/advisories/:advisoryId',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: AdvisoryPage
    },
    {
        path: '/advisories/:advisoryId/:inventoryId',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: InventoryDetail
    },
    {
        path: '/packages',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: PackagsPage
    },
    {
        path: '/packages/:packageName',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: PackageDetail
    },
    {
        path: '/packages/:packageName/:inventoryId',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: InventoryDetail
    },
    {
        path: '/templates',
        isExact: true,
        requiredPermissions: ['patch:*:read'],
        component: Templates
    }
];

export const Routes = () => {
    return (
        <Suspense
            fallback={
                <Bullseye>
                    <Spinner />
                </Bullseye>
            }
        >
            <Switch>
                {paths.map(PermissionRouter)}
                <Route>
                    <Redirect to="/advisories" />
                </Route>
            </Switch>
        </Suspense>
    );
};

Routes.propTypes = {
    childProps: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string
        }),
        history: PropTypes.any
    })
};

