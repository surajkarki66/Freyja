from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.models import Sequential

def get_model():
    model = Sequential()
    model.add(LSTM(300, dropout=0.4, recurrent_dropout=0.4, input_shape=[1, 300], return_sequences=True))
    model.add(Dropout(0.3))
    model.add(LSTM(128, recurrent_dropout=0.4, return_sequences = True))
    model.add(Dropout(0.3))
    model.add(LSTM(64, recurrent_dropout=0.4))
    model.add(Dropout(0.3))
    model.add(Dense(1, activation='relu'))
    model.compile(loss='mean_squared_error', optimizer='rmsprop', metrics=['mae', 'mse'])
    model.summary()
    return model
