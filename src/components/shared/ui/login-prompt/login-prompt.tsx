import React from 'react';
import { Button, Typography, Divider, Result } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './login-prompt.module.scss';

const { Title, Text } = Typography;

type Props = {
  title?: string;
  description?: string;
  showSignup?: boolean;
  onLogin?: () => void;
  onSignUp?: () => void;
  compact?: boolean; // if true, renders a compact inline prompt
};

const LoginPrompt: React.FC<Props> = ({
  title = 'Vui lòng đăng nhập',
  description = 'Bạn cần đăng nhập để truy cập nội dung này. Nếu chưa có tài khoản, hãy đăng ký ngay!',
  showSignup = true,
  onLogin,
  onSignUp,
  compact = false,
}) => {
  const router = useRouter();

  const handleLogin = () => {
    if (onLogin) return onLogin();
    router.push('/auth/sign-in');
  };

  const handleSignUp = () => {
    if (onSignUp) return onSignUp();
    router.push('/auth/sign-up');
  };

  if (compact) {
    return (
      <div className={styles.containerInline} aria-live="polite">
        <div className={styles.promptWrapperInline} role="dialog" aria-label={title}>
          <div className={styles.headerInline}>
            <UserOutlined className={styles.inlineIcon} />
            <div>
              <Title level={4} className={styles.titleInline}>
                {title}
              </Title>
              {description && (
                <Text type="secondary" className={styles.descriptionInline}>
                  {description}
                </Text>
              )}
            </div>
          </div>

          <div className={styles.actionButtonsInline}>
            {showSignup && (
              <Button type="link" onClick={handleSignUp} aria-label="Sign up">
                Đăng ký
              </Button>
            )}
            <Button type="primary" icon={<LoginOutlined />} onClick={handleLogin} aria-label="Sign in">
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} aria-live="polite">
      <div className={styles.promptWrapper} role="dialog" aria-label={title}>
        <Result
          icon={<UserOutlined className={styles.resultIcon} />}
          title={title}
          subTitle={description}
          extra={
            <div className={styles.actionButtons}>
              {showSignup && (
                <Button key="signup" onClick={handleSignUp} className={styles.signupButton}>
                  Đăng ký
                </Button>
              )}
              <Button key="signin" type="primary" icon={<LoginOutlined />} onClick={handleLogin} className={styles.loginButton}>
                Đăng nhập
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LoginPrompt;