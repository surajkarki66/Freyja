from django.urls import include, path

from . import views
from api.calculate_score import calculate_score

urlpatterns = [
    path('questions/', views.question_list),
    path('question/<int:pk>/', views.question_detail),
    path('question/create/', views.question_create),
    path('question/update/<int:pk>/', views.question_update),
    path('question/partial_update/<int:pk>/', views.question_partial_update),
    path('question/delete/<int:pk>/', views.question_delete),
    path('score/<int:pk>/', calculate_score)
]
