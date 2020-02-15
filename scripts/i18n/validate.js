const { existsSync } = require('fs');

const validateFbtEnumPath = (fbtEnumPath) => {
  const fileExist = existsSync(fbtEnumPath);

  if (!fileExist) {
    throw new Error(`\n\n\n
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

⚠️ You can't build javascript bundle without  "i18n enum manifest"

To fix this problem try run once \`yarn i18n-manifest\` 💁
      
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
\n\n\n`);
  }

  return fbtEnumPath;
};

module.exports = {
  validateFbtEnumPath,
};
