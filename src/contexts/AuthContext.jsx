import { createContext, useReducer, useEffect } from "react"
import { user as model } from "../models/user/user";
import { isValidToken, setSession } from "../utils/jwt";

const Action = {
  initialize: 'INITIALIZE',
  login: 'LOGIN',
  logout: 'LOGOUT',
}

const reducer = (currentState, newState) => {
  switch(newState.action) {
    case Action.initialize:
      return {
        isAuthenticated: newState.data.isAuthenticated,
        isInitialized: true,
        user: newState.data.user,
        token: newState.data.token
      };
    case Action.login:
      return {
        ...currentState,
        isAuthenticated: true,
        user: newState.data.user,
        token: newState.data.token
      };
    case Action.logout:
      return {
        ...currentState,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return currentState;
  }
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = window.localStorage.getItem('token');

        if (token && isValidToken(token)) {
          setSession(token);

          const user = await model.details();

          dispatch({
            action: Action.initialize,
            data: {
              isAuthenticated: true,
              user,
              token,
            },
          });
        } else {
          dispatch({
            action: Action.initialize,
            data: {
              isAuthenticated: false,
              user: null,
              token: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          action: Action.initialize,
          data: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await model.login(username, password);
    const { token } = response;

    if (token) {
      setSession(token);

      const user = await model.details();

      if (user) {
        dispatch({
          action: Action.login,
          data: {
            user,
            token,
          },
      });
    }
    }
    
  }

  const logout = async () => {
    setSession(null, null);
    dispatch({ action: Action.logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };