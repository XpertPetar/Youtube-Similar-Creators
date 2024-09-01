import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Assign api key and initialize youtube api
API_KEY = 'AIzaSyBI3xTHl4jon46t5l22GPZ6jtbfNvyVSfo'
youtube = build('youtube', 'v3', developerKey=API_KEY)
channel_cache = {}

# Get channel id from channel title
def get_channel_id(channel_title):
    try:
        request = youtube.search().list(
            part='snippet',
            q=channel_title,
            type='channel',
            maxResults=1
        )
        response = request.execute()
        if response['items']:
            return response['items'][0]['id']['channelId']
        else:
            print(f"Channel ID not found for title: {channel_title}")
            return None
    except HttpError as e:
        print(f"HttpError: {e}")
        return None


# Get channel details from channel id
def get_channel_details(channel_id):
    if channel_id in channel_cache:
        return channel_cache[channel_id]

    try:
        request = youtube.channels().list(
            part='snippet',
            id=channel_id
        )
        response = request.execute()
        if response['items']:
            channel = response['items'][0]
            details = {
                'name': channel['snippet']['title'],
                'url': f"https://www.youtube.com/channel/{channel_id}",
                'avatar': channel['snippet']['thumbnails']['high']['url']
            }
            channel_cache[channel_id] = details
            return details
        else:
            return None
    except HttpError as e:
        print(f"Error fetching channel details for ID {channel_id}: {e}")
        return None


directory = os.getcwd()
df = pd.read_csv(directory + "/popular youtube videos/USvideos.csv")

# Data preparation / Handle missing values
df['title'] = df['title'].fillna('').astype(str)
df['tags'] = df['tags'].fillna('').astype(str)
df['description'] = df['description'].fillna('').astype(str)
df['category_id'] = df['category_id'].astype(str)


# Create a combined text feature with specific weights for each part
def weighted_similarity(df, target_channel_name):
    channel_group = df.groupby('channel_title').agg({
        'title': lambda x: ' '.join(x),
        'tags': lambda x: ' '.join(x),
        'description': lambda x: ' '.join(x),
        'category_id': lambda x: ' '.join(x.unique())
    }).reset_index()

    target_row = channel_group[channel_group['channel_title'] == target_channel_name]
    if target_row.empty:
        print(f"Channel '{target_channel_name}' not found in the dataset.")
        return []

    target_title = target_row['title'].values[0]
    target_tags = target_row['tags'].values[0]
    target_description = target_row['description'].values[0]
    target_category = target_row['category_id'].values[0]

    title_features = [target_title] + channel_group['title'].tolist()
    tags_features = [target_tags] + channel_group['tags'].tolist()
    description_features = [target_description] + channel_group['description'].tolist()
    category_features = [target_category] + channel_group['category_id'].tolist()

    # Define TF-IDF vectorizers for each feature
    vectorizer_title = TfidfVectorizer(stop_words='english', max_features=10000, ngram_range=(1, 2))
    vectorizer_tags = TfidfVectorizer(stop_words='english', max_features=10000, ngram_range=(1, 2))
    vectorizer_description = TfidfVectorizer(stop_words='english', max_features=10000, ngram_range=(1, 2))
    vectorizer_category = TfidfVectorizer(stop_words='english', max_features=10000)

    # Vectorize each feature
    tfidf_matrix_title = vectorizer_title.fit_transform(title_features)
    tfidf_matrix_tags = vectorizer_tags.fit_transform(tags_features)
    tfidf_matrix_description = vectorizer_description.fit_transform(description_features)
    tfidf_matrix_category = vectorizer_category.fit_transform(category_features)

    # Calculate similarities
    sim_title = cosine_similarity(tfidf_matrix_title[0], tfidf_matrix_title[1:]).flatten()
    sim_tags = cosine_similarity(tfidf_matrix_tags[0], tfidf_matrix_tags[1:]).flatten()
    sim_description = cosine_similarity(tfidf_matrix_description[0], tfidf_matrix_description[1:]).flatten()
    sim_category = cosine_similarity(tfidf_matrix_category[0], tfidf_matrix_category[1:]).flatten()

    # Assign weights
    weight_title = 0.25
    weight_category = 0.25
    weight_tags = 0.25
    weight_description = 0.25

    # Calculate combined similarity score
    combined_similarity = (
            weight_category * sim_category +
            weight_tags * sim_tags +
            weight_title * sim_title +
            weight_description * sim_description
    )

    # Assign combined similarity scores to the channels
    channel_group['combined_similarity'] = combined_similarity

    # Sort channels by combined similarity, excluding the target channel
    similar_channels = channel_group[channel_group['channel_title'] != target_channel_name] \
        .sort_values(by='combined_similarity', ascending=False)

    # Get top 10 similar channels
    top_channels = similar_channels.head(10)

    # Fetch channel details for the top channels
    results = []
    for index, row in top_channels.iterrows():
        channel_title = row['channel_title']
        channel_id = get_channel_id(channel_title)
        if channel_id:
            details = get_channel_details(channel_id)
            if details:
                results.append({
                    'channel_title': channel_title,
                    'url': details['url'],
                    'avatar': details['avatar']
                })

    # Return the top 4 channels
    top_4_channels = results[:4]

    return top_4_channels


# Test the program
target_channel_name = "PewDiePie"
similar_channels = weighted_similarity(df, target_channel_name)
for channel in similar_channels:
    print(f"Channel Title: {channel['channel_title']}")
    print(f"URL: {channel['url']}")
    print(f"Avatar: {channel['avatar']}")
    print()

