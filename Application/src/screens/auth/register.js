import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import Header from '@components/Header';
import { EMAIL_REGEX } from '@utils/validateInput';
import { useTheme } from '@react-navigation/native';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    console.log(data);
    navigation.goBack();
  };

  return (
    <View style={[styles.viewContainer, { backgroundColor: colors.BACKGROUND }]}>
      <Header left={true} />
      <View style={styles.viewTextInput}>
        <View>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required.',
              },
              pattern: {
                value: EMAIL_REGEX,
                message: 'Pattern is invalid.',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <Input
                label={'Email'}
                placeholder="email@address.com"
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors?.email?.message}
                leftIcon={<Icon name="mail" size={24} color={colors.TEXT_TITLE} />}
                labelStyle={{ color: colors.TEXT_TITLE }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required.',
              },
              minLength: {
                value: 4,
                message: 'Min 4 character.',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <Input
                label={'Password'}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors?.password?.message}
                leftIcon={<Icon name="lock" size={24} color={colors.TEXT_TITLE} />}
                labelStyle={{ color: colors.TEXT_TITLE }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <Input
                label={'Confirm Password'}
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={
                  getValues('confirmPassword') != getValues('password')
                    ? 'password not match'
                    : ''
                }
                leftIcon={<Icon name="lock" size={24} color={colors.TEXT_TITLE} />}
                labelStyle={{ color: colors.TEXT_TITLE }}
              />
            )}
          />
        </View>
        <View>
          <Button
            title={'Confirm'}
            buttonStyle={[styles.buttonStyle, { backgroundColor: colors.BACKGROUND_COMPONENT }]}
            onPress={handleSubmit(onSubmit)}></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textLogoPartA: {
    color: 'black',
    fontSize: 34,
  },
  viewTextInput: {
    flex: 1,
    width: '85%',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5
  },
  headerStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
  },
  textHeaderStyle: {
    color: 'black',
    fontSize: 24,
  },
});

export default RegisterScreen;
