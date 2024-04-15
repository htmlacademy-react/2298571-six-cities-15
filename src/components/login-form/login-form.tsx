import { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, Errors, SubmitStatus } from '../../const';
import { toast } from 'react-toastify';
import { AuthData } from '../../types/types';
import { validateForm } from '../../utils';

export default function LoginForm(): JSX.Element {
  const authStatus = useAppSelector((initialState) => initialState.authStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.Null);
  const isSubmitting = submitStatus === SubmitStatus.Pending;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitStatus(SubmitStatus.Pending);
    if (!loginRef.current || !passwordRef.current) {
      return;
    }

    const email = loginRef.current.value;
    const password = passwordRef.current.value;

    if (!validateForm(email, password)) {
      setSubmitStatus(SubmitStatus.Null);
      return;
    }

    const authData: AuthData = {
      login: email,
      password: password
    };

    dispatch(loginAction(authData))
      .then((response) => {
        if (response.meta.requestStatus === 'rejected') {
          toast.error(Errors.AUTH_MESSAGE);
          setSubmitStatus(SubmitStatus.Error);
        } else {
          setSubmitStatus(SubmitStatus.Fulfilled);
          navigate(AppRoute.Main);
        }
      })
      .catch(() => {
        toast.error(Errors.AUTH_MESSAGE);
        setSubmitStatus(SubmitStatus.Error);
      });
  };

  return (

    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        className="login__form form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            ref={loginRef}
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            ref={passwordRef}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          className="login__submit form__submit button"
          type="submit"
          disabled={isSubmitting}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}
