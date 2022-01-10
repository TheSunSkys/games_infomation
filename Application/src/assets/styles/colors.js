const BLACK = '#121212'
const GRAY = '#808080'
const WHITE = '#FFFFFF'
const WHITE_DOWN = '#DEDEDE'
const WHITE_DOWN_TWO = '#B5B5B5'
const BLACK_UP = '#353535'
const YELLOW = '#7f7a6f'
const GOLD = '#bea67c'

const light = {
    BACKGROUND: WHITE,
    BACKGROUND_COMPONENT: BLACK,
    TEXT_ACTIVE: BLACK,
    TEXT_UNACTIVE: GRAY,
    TEXT_TITLE: WHITE_DOWN,
    TEXT_SUBTITLE: WHITE_DOWN_TWO,
    BORDER_ACTIVE: YELLOW,
    TEXT_STORY: YELLOW,
    PROGRESS: GOLD
};

const dark = {
    BACKGROUND: BLACK,
    BACKGROUND_COMPONENT: BLACK_UP,
    TEXT_ACTIVE: WHITE,
    TEXT_UNACTIVE: GRAY,
    TEXT_TITLE: WHITE_DOWN,
    TEXT_SUBTITLE: WHITE_DOWN_TWO,
    BORDER_ACTIVE: YELLOW,
    TEXT_STORY: YELLOW,
    PROGRESS: GOLD
};

export const colors = { light, dark };