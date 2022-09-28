import {View, Text, Modal, Pressable, FlatList} from 'react-native';
import styles from './Setting.styles';
import {ItemCard, Button} from '../../../components';
import {get} from '../../../api/baseAPI';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  apiLoading,
  apiLoaded,
  apiError,
} from '../../../features/APIloading/apiLoadingSlice';

const PopUpModalCard = ({item, image, children}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <Button labelText={'Close'} onPress={handleClose} />
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <ItemCard
          title={item?.name}
          assetId={item?.asset_id}
          image={image?.url}
        />
      </Pressable>
    </View>
  );
};

export default function Setting({navigation}) {
  const [listData, setListData] = useState([]);
  const [listOfIconData, setListOfIconData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    handleLoadCoins();
  }, [isFocused]);

  const handleLoadCoins = async () => {
    dispatch(apiLoading());

    const data = await get({endpoint: 'v1/assets'});
    setListData(data);
    const iconData = await get({endpoint: 'v1/assets/icons'});
    setListOfIconData(iconData);
    dispatch(apiLoaded());
  };

  const getPrice = val => {
    let tempVal = val.toFixed(4);
    return tempVal;
  };

  const renderItem = ({item, index}) => {
    let image = {};
    if (listOfIconData) {
      image = listOfIconData.filter(img => img.asset_id === item?.asset_id)[0];
    }
    return (
      <>
        <PopUpModalCard item={item} image={image}>
          <Text style={styles.modalText}>{item?.name}</Text>
          <Text style={styles.modalText}>{`Price in USD = ${getPrice(
            Number(item?.price_usd),
          )}`}</Text>
        </PopUpModalCard>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
