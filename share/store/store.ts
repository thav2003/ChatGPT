const USER_KEY = 'auth-user';
const BASE_API_URL = "http://172.188.16.85:8080/api/v1"

type TWindow = {
    counter$: Observable<number>;
    conservations$: Observable<any[]>;
    listMessage$: Observable<any>;
    getListConservation: () => void;
    getListMessage: (id:string) => void;
    increaseCounter: () => void;
    decreaseCounter: () => void;
    createSubscription: () => Subscription;
    tap: <T>(value: T) => void;

    isLoggedIn: () => boolean;
    getUser: () => any;
    saveUser: (user: any) => void;
    clean: () => void;

    login: (data:{email: string, password: string}) => Observable<any>
    register: (data:{email: string, password: string, confirmPassword:string}) => Observable<any> 
    logout: () => Observable<any>

    initedStore: boolean;
  } & globalThis.Window;
  
  import { BehaviorSubject, Observable, Subscription, catchError, delay, from, of, switchMap, tap } from "rxjs";
  
  const windowStore = window as unknown as TWindow;
  
  if (!windowStore.initedStore) {
    windowStore.initedStore = true;
    const counterSubject = new BehaviorSubject<number>(0);
    const conservationSubject = new BehaviorSubject<any[]>([]);
    const messageSubject = new BehaviorSubject<any>(null);
    windowStore.counter$ = counterSubject.asObservable();
    windowStore.conservations$ = conservationSubject.asObservable();
    windowStore.listMessage$ = messageSubject.asObservable();
  
    windowStore.getListConservation = () => {

      const fetchApi = async () => {
        const response = await fetch(`${BASE_API_URL}/conversation/user`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${windowStore.getUser().accessToken}`
            }
          })
        const responseData = await response.json()
        conservationSubject.next(responseData.data)
      }
      fetchApi();
      
    }
    windowStore.getListMessage = (id) =>{
      fetch(`${BASE_API_URL}/conversation/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${windowStore.getUser().accessToken}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          messageSubject.next(data.data)
        })
        .catch((error) => {
          console.error('Error fetching conversation data:', error)
        })
    }
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

    windowStore.login =  (data) => {
      return from(
        fetch(`${BASE_API_URL}/user/signin`, {
          method: "POST", // Hoặc sử dụng phương thức HTTP phù hợp
          headers: {
            "Content-Type": "application/json", // Cần thiết nếu bạn gửi dữ liệu JSON
            //Thêm các header khác nếu cần thiết
          },
          body: JSON.stringify(data),
        })
      ).pipe(
        switchMap((response) => {
          console.log(response)
          if (!response.ok) {
            return from(response.json()).pipe(
              switchMap((errorData) => {
                const errorMessage  = errorData.message || 'Fail to login';
                return Promise.reject(new Error(errorMessage));
              })
            ) // Xử lý lỗi khi trạng thái không thành công
          }
          return from(response.json())
     
        }),
        catchError((error) => {
          console.error(error);
          return from(Promise.reject(error)); // Chuyển đổi lỗi thành Observable để có thể bắt lấy ở subscriber
        })
      );
    }

    windowStore.register = (data) => {
      return from(
        fetch(`${BASE_API_URL}/user/signup`, {
          method: "POST", // Hoặc sử dụng phương thức HTTP phù hợp
          headers: {
            "Content-Type": "application/json", // Cần thiết nếu bạn gửi dữ liệu JSON
            //Thêm các header khác nếu cần thiết
          },
          body: JSON.stringify(data),
        })
      ).pipe(
        switchMap((response) => {
          console.log(response)
          if (!response.ok) {
            return from(response.json()).pipe(
              switchMap((errorData) => {
                const errorMessage  = errorData.message || 'Fail to register';
                return Promise.reject(new Error(errorMessage));
              })
            ) // Xử lý lỗi khi trạng thái không thành công
          }
          return from(response.json()); // Chuyển đổi dữ liệu JSON từ phản hồi thành Observable
        }),
        catchError((error) => {
          console.error(error);
          return from(Promise.reject(error)); // Chuyển đổi lỗi thành Observable để có thể bắt lấy ở subscriber
        })
      );
    }

    windowStore.logout = () => {
      return of({ message: 'logout success' }).pipe(
        delay(2000)
      );
    }

    windowStore.isLoggedIn = () => {
      const user = window.localStorage.getItem(USER_KEY);
      if (user) {
        return true;
      }

      return false;
    }

    windowStore.getUser = () => {
      const user = window.localStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }

      return null;
    }

    windowStore.saveUser = (user:any) => {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    windowStore.clean = () => window.localStorage.clear();
  }
  
  export default windowStore;