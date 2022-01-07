import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useTheme } from '@react-navigation/native';

import { AuthContext } from '@navigation/auth';
import { EMAIL_REGEX } from '@utils/validateInput';

const LoginScreen = () => {
  const { colors } = useTheme()
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    signIn();
  };

  return (
    <View style={[styles.viewContainer, { backgroundColor: colors?.BACKGROUND }]}>
      <View style={styles.viewTextInput}>
        <View style={styles.viewLogoStyle}>
          <Text style={[styles.textLogoPartA, { color: colors?.TEXT_ACTIVE }]}>Game Information</Text>
        </View>
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
                leftIcon={<Icon name="mail" size={24} color={colors?.TEXT_TITLE} />}
                labelStyle={{
                  color: colors?.TEXT_TITLE
                }}
                inputStyle={{
                  color: colors?.TEXT_TITLE
                }}
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
                leftIcon={<Icon name="lock" size={24} color={colors?.TEXT_TITLE} />}
                labelStyle={{
                  color: colors?.TEXT_TITLE
                }}
                inputStyle={{
                  color: colors?.TEXT_TITLE
                }}
              />
            )}
          />
        </View>
        <View>
          <Button
            buttonStyle={[styles.buttonLogin, { backgroundColor: colors?.BACKGROUND_COMPONENT }]}
            title={'Login'}
            onPress={handleSubmit(onSubmit)}
          />
          <Button
            buttonStyle={[styles.buttonLogin, { backgroundColor: colors?.BACKGROUND_COMPONENT }]}
            title={'Register'}
            onPress={() => navigation.navigate('RegisterScreen')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewLogoStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogoPartA: {
    fontSize: 34,
  },
  viewTextInput: {
    flex: 1,
    width: '85%',
    justifyContent: 'space-between',
  },
  buttonLogin: {
    marginVertical: 5,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10
  },
  viewRegister: {
    alignItems: 'flex-end',
  },
  textRegister: {
    color: '#3B82F6',
  },
});

export default LoginScreen;
