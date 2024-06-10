import React, { useEffect } from "react";
import { Modal, View, StyleSheet } from "react-native";
import Button from "../Button";
import { Colors } from "../../constants/colors";

const MyModal = ({ children, visible, onClose }) => {
  useEffect(() => {
    return () => {
      // Выполните необходимые действия при закрытии модального окна
    };
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalWrapper}>
          {children}
          <Button
            onPress={onClose}
            text={"modal.close"}
            backgroundColor={Colors.red}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
});

export default MyModal;
