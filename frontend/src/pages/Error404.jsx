import { useTranslation } from 'react-i18next';

const Error404 = () => {
  const { t } = useTranslation();

  return (
    <h1>{t('errors.e404')}</h1>
  );
};

export default Error404;
