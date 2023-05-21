import pickle
import numpy as np
from nltk.tokenize import word_tokenize
import nltk
nltk.download('punkt')

import warnings
warnings.filterwarnings('ignore')

def predict(input_ans , num_ques):
    model_path = "model_question"+num_ques + ".h5"
    with open(model_path, 'rb') as file:
        model, model_word2vec = pickle.load(file)
    input_ans = preprocces_input(input_ans, model_word2vec)
    input_ans = input_ans.reshape(1, -1)
    pred = model.predict(input_ans)
    result = pred[0]
    return result


def get_word_vector(tokens, model_word2vec):
    textvector = np.zeros((100,), dtype='float32')
    for token in tokens:
        try:
            textvector += model_word2vec.wv[token]
        except KeyError:
            continue
    return textvector


def preprocces_input(text, model_word2vec):
    text = text.lower()
    tokens = word_tokenize(text)
    textvector = get_word_vector(tokens, model_word2vec)
    return textvector




