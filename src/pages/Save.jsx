import React, { useContext } from "react"
import styles from "./Save.module.css"
import { ExportMenu } from "../components/ExportMenu"
import { ViewMode, ViewContext } from "../context/ViewContext"
import CustomButton from "../components/custom-button"
import { LanguageContext } from "../context/LanguageContext"
import { SoundContext } from "../context/SoundContext"
import { AudioContext } from "../context/AudioContext"
import MergeOptions from "../components/MergeOptions"

function Save() {
  const { t } = useContext(LanguageContext);
  const { playSound } = React.useContext(SoundContext)
  const { isMute } = React.useContext(AudioContext)
  const { setViewMode } = React.useContext(ViewContext);

  const back = () => {
    setViewMode(ViewMode.APPEARANCE)
    !isMute && playSound('backNextButton');
  }

  return (
    <div className={styles.container}>
      <div className={"sectionTitle"}>{t("pageTitles.saveCharacter")}</div>
      <div className={styles.buttonContainer}>
        <CustomButton
          theme="light"
          text={t('callToAction.back')}
          size={14}
          className={styles.buttonLeft}
          onClick={back}
        />
        <MergeOptions
          showCreateAtlas={true}
          mergeMenuTitle={"Download Options"}
        />
        <ExportMenu
          currentPrice={0}
          onPurchaseClick={() => {}}
        />
      </div>
    </div>
  )
}

export default Save
