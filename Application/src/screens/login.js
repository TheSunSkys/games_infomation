import React, { useContext } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Button, Input } from "react-native-elements"
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Entypo";

import { AuthContext } from "../navigation/auth";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginScreen = () => {
    const { signIn } = useContext(AuthContext);
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = data => {
        console.log(data)
        signIn()
    };

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.textLogoPartA}>
                Game Information
            </Text>
            <View style={styles.viewTextInput}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Email is required.'
                        },
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Pattern is invalid.'
                        }
                    }}
                    render={({ field: { onChange, onBlur } }) => (
                        <Input
                            label={"Email"}
                            placeholder="email@address.com"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            errorMessage={errors?.email?.message}
                            leftIcon={
                                <Icon
                                    name="mail"
                                    size={24}
                                    color="black"
                                />
                            }
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Password is required.'
                        },
                        minLength: {
                            value: 4,
                            message: 'Min 4 character.'
                        }
                    }}
                    render={({ field: { onChange, onBlur } }) => (
                        <Input
                            label={"Password"}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            errorMessage={errors?.password?.message}
                            leftIcon={
                                <Icon
                                    name="lock"
                                    size={24}
                                    color="black"
                                />
                            }
                        />
                    )}
                />
                <Button
                    buttonStyle={styles.buttonLogin}
                    title={"Login"}
                    onPress={handleSubmit(onSubmit)}
                />
                <View style={styles.viewRegister}>
                    <Text style={styles.textRegister}>
                        Register
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    textLogoPartA: {
        color: "black",
        fontSize: 34
    },
    viewTextInput: {
        width: "80%"
    },
    buttonLogin: {
        backgroundColor: "black",
        borderRadius: 10,
    },
    viewRegister: {
        alignItems: "flex-end"
    },
    textRegister: {
        color: "#3B82F6"
    }
})

export default LoginScreen