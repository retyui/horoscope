#!/bin/bash

BIN=./node_modules/babel-plugin-fbt/bin
TMP_ROOT=./node_modules/.i18n-cache
SRC_ROOT=./src

SRC_MANIFEST=${TMP_ROOT}/src-manifest.json
ENUM_MANIFEST=${TMP_ROOT}/enum-manifest.json
SOURCE_STRINGS=${TMP_ROOT}/source-strings.json

TRANSLATIONS_MASK=${SRC_ROOT}/features/i18n/translations/*.json
OUTPUT_TRANSLATED=${SRC_ROOT}/features/i18n/translated.json

[ -d ${TMP_ROOT} ] || mkdir -p ${TMP_ROOT}

if [[ $1 == "manifest" ]]; then
  rm -f ${SRC_MANIFEST} ${ENUM_MANIFEST}
  node ${BIN}/manifest.js \
    --src ${SRC_ROOT} \
    --enum-manifest ${ENUM_MANIFEST} \
    --src-manifest ${SRC_MANIFEST}
elif [[ $1 == "collect" ]]; then
  rm -f ${SOURCE_STRINGS}
  node ${BIN}/collectFBT.js \
    --react-native-mode \
    --pretty \
    --manifest \
    <${SRC_MANIFEST} \
    >${SOURCE_STRINGS}
elif [[ $1 == "translate" ]]; then
  node ${BIN}/translate.js \
    --jenkins \
    --pretty \
    --src-manifest ${SRC_MANIFEST} \
    --source-strings ${SOURCE_STRINGS} \
    --translations ${TRANSLATIONS_MASK} \
    >${OUTPUT_TRANSLATED}
fi
