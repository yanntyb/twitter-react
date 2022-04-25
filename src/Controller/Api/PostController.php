<?php

namespace App\Controller\Api;

use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/post", name: "api_post_")]
class PostController extends AbstractController
{
    private PostRepository $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    #[Route("/get", name: "related")]
    function getUserRelatedPost(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        if($data->user !== "0"){
            $posts = $this->postRepository->getRelated($this->getUser());
        }
        else{
            $posts = $this->postRepository->getTrend();
        }
        return $this->json($posts);
    }
}
