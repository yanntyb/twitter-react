<?php

namespace App\Controller\Api;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/user", name: "api_user_")]
class UserController extends AbstractController
{
    private PostRepository $repository;

    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    #[Route("/getCurrent", name: "get_connected")]
    public function getConnected(): JsonResponse
    {
        if($this->getUser()){
            return $this->json(["connected" => true, "user" => $this->getUser()]);
        }
        return $this->json(["connected" => false]);
    }

    #[Route("/get", name: "user_posts")]
    public function userPosts(): JsonResponse
    {
        $posts = [...$this->repository->findBy(["user" => $this->getUser()->getId()])];
        $postsWithUserAction = [];
        foreach($posts as $post){
            $postsWithUserAction[] = [
                "data" => $post,
//                "action" => [
//                    "bookmark" => (bool)$this->bookmarkRepository->findOneBy(["post" => $post->getId(), "user" => $this->getUser()->getId()]),
//                    "like" => (bool)$this->likeRepository->findOneBy(["post" => $post->getId(), "user" => $this->getUser()->getId()]),
//                ],
            ];
        }
        $posts = $postsWithUserAction;
        return $this->json($postsWithUserAction);
    }
}