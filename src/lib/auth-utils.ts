export type UserRole = "ADMIN" | "USER" | "SUPERADMIN";

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/signIn", "/signUp", "/forgot-password", "/reset-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/profile"],
    patterns: [],
}

export const userProtectedRoutes: RouteConfig = {
    exact: ["/my-booking"],
    patterns: [],
}

export const superAdminProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /admin/*
    exact: [], // "/admins"
}



export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "ADMIN" | "COMMON" | "USER" | "SUPERADMIN" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }

    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    }
    if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
        return "SUPERADMIN";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {


    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}