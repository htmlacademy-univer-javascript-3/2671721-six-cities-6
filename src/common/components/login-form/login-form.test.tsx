import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './login-form';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/user/user-api-actions';
import { Mock } from 'vitest';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AuthRequest } from '../../types/auth';

vi.mock('../../../store/hooks/hooks', () => ({
  useAppDispatch: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

vi.mock('../../../store/user/user-api-actions', () => ({
  login: vi.fn()
}));

describe('LoginForm Component', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const mockLoginAction = vi.fn() as unknown as AsyncThunkAction<void, AuthRequest, Record<string, never>>;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    (login as unknown as Mock).mockReturnValue(mockLoginAction);

    mockDispatch.mockResolvedValue(undefined);
  });

  it('should render form with all elements', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should update email state when typing', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('should update password state when typing', async () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call dispatch with login action on form submit', async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(mockDispatch).toHaveBeenCalledWith(mockLoginAction);
  });
});
