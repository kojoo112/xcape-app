import {ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {currentThemeState} from '../atoms';
import {setValue} from '../plugins/firebase';
import {useInitialLoading} from '../context/InitialLoadingContext';
import {ViewType} from '../ViewType';

const TagView = props => {
  const {viewList} = props.route.params;
  const tagId = viewList[0].tagId;

  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const {setLoading} = useInitialLoading();

  useEffect(() => {
    const findByTagId = currentTheme.usedTagIdList.find(
      usedTag => usedTag.id === tagId,
    );

    if (!findByTagId.isUsed) {
      const newUsedTagIdList = currentTheme.usedTagIdList.map(tag =>
        tag.id === tagId ? {...tag, isUsed: true} : tag,
      );

      const hintCount = newUsedTagIdList.filter(tag => tag.isUsed).length;
      const progress = (hintCount / currentTheme.tagList.length) * 100;

      const newThemeValue = {
        ...currentTheme,
        usedTagIdList: newUsedTagIdList,
        progress,
        hintCount,
      };
      setCurrentTheme({...newThemeValue});
      setValue(`/gameStatus/theme-${currentTheme.id}`, newThemeValue);
    }
    setLoading(false);
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {viewList.map(view => {
        const {type, answer, targetTagId, height, url, message1, message2} =
          view;
        const Component = ViewType[type];

        return (
          <Component
            key={view.id}
            answer={answer}
            targetTagId={targetTagId}
            height={height}
            url={url}
            message1={message1}
            message2={message2}
          />
        );
      })}
    </ScrollView>
  );
};

export default TagView;
