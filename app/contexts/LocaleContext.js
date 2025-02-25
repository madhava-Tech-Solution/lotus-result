import i18n from '../i18n';
import React, { useState } from 'react';

const LocaleContext = React.createContext({
  LOCALE: i18n.language === 'en' ? '' : '/' + i18n.language,
});

export default LocaleContext;
