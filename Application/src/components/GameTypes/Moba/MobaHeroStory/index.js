import React, { useState, useCallback } from "react"
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useTheme } from "@react-navigation/native"
import { fontSize } from "@utils/constant";
import { Button } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MobaHeroStory = ({
    story = ""
}) => {
    const { colors } = useTheme()
    const [numberLineStory, setNumberLineStory] = useState(10);
    const [numberStory, setNumberStory] = useState(0);
    const [showMore, setShowMore] = useState(false)

    const onTextLayout = useCallback(e => {
        setShowMore(e.nativeEvent.lines.length > numberLineStory);
        setNumberStory(e.nativeEvent.lines.length)
    }, [numberLineStory]);

    return (
        <ScrollView>
            <Text
                numberOfLines={numberLineStory}
                style={[styles.textStory, { color: colors?.TEXT_STORY }]}
                onTextLayout={onTextLayout}
            >
                {"      " + story}
            </Text>
            {
                showMore && <View style={styles.viewBotton}>
                    <Button
                        type="clear"
                        containerStyle={{ width: wp('30%') }}
                        titleStyle={[styles.textStory, { color: colors?.TEXT_TITLE }]}
                        onPress={() => {
                            setNumberLineStory(numberStory + 1)
                        }}
                        title={"More ..."}
                    />
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textStory: { fontSize: fontSize.sm },
    viewBotton: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default MobaHeroStory