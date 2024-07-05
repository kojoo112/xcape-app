import React, {useState} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TreeView = ({data, level}) => {
  const [clicked, setClicked] = useState(false);
  const hasChildren = !!data.items;
  return (
    <View style={{borderBottomWidth: 1, borderColor: 'white'}}>
      <View key={data.id} style={{...styles.container, marginLeft: 25 * level}}>
        <TouchableOpacity
          onPress={() => {
            setClicked(flag => !flag);
          }}>
          <View style={{flexDirection: 'row'}}>
            {hasChildren && clicked ? (
              <Ionicons name="chevron-down-outline" color="white" size={24} />
            ) : hasChildren ? (
              <Ionicons
                name="chevron-forward-outline"
                color="white"
                size={24}
              />
            ) : (
              <></>
            )}
            <Text style={{fontSize: 24, color: 'white'}}>{data.name}</Text>
          </View>
        </TouchableOpacity>
        {hasChildren && clicked ? (
          data.items.map(item => {
            return <TreeView data={item} level={level + 1} />;
          })
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default TreeView;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
  },
});
