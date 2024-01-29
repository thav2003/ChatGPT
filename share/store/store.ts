const USER_KEY = 'auth-user';

type TWindow = {
    counter$: Observable<number>;
    increaseCounter: () => void;
    decreaseCounter: () => void;
    createSubscription: () => Subscription;
    tap: <T>(value: T) => void;

    isLoggedIn: () => boolean;
    getUser: () => any;
    saveUser: (user: any) => void;
    clean: () => void;

    login: (data:{email: string, password: string}) => Observable<any>
    register: (data:{email: string, password: string}) => Observable<any> 
    logout: () => Observable<any>

    initedStore: boolean;
  } & globalThis.Window;
  
  import { BehaviorSubject, Observable, Subscription, delay, of, tap } from "rxjs";
  
  const windowStore = window as unknown as TWindow;
  
  if (!windowStore.initedStore) {
    windowStore.initedStore = true;
    const counterSubject = new BehaviorSubject<number>(0);
    windowStore.counter$ = counterSubject.asObservable();
  
    windowStore.increaseCounter = () => {
      const currentValue = counterSubject.value;
      counterSubject.next(currentValue + 1);
    };
  
    windowStore.decreaseCounter = () => {
      const currentValue = counterSubject.value;
      counterSubject.next(currentValue - 1);
    };
  
    windowStore.createSubscription = () => new Subscription();
  
    windowStore.tap = () => tap;

    windowStore.login = (data) => {
      return of({ data, token: 'your_access_token' }).pipe(
        delay(2000)
      );
    }

    windowStore.register = (data) => {
      return of({ data, message: 'register success' }).pipe(
        delay(2000)
      );
    }

    windowStore.logout = () => {
      return of({ message: 'logout success' }).pipe(
        delay(2000)
      );
    }

    windowStore.isLoggedIn = () => {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }

      return false;
    }

    windowStore.getUser = () => {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }

      return null;
    }

    windowStore.saveUser = (user:any) => {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    windowStore.clean = () => window.sessionStorage.clear();
  }
  
  export default windowStore;