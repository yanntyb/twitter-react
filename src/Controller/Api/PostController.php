<?php

namespace App\Controller\Api;

use App\Repository\BookmarkRepository;
use App\Repository\LikeRepository;
use App\Repository\PostRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Post;

#[Route("/api/post", name: "api_post_")]
class PostController extends AbstractController
{
    private PostRepository $postRepository;
    private BookmarkRepository $bookmarkRepository;
    private LikeRepository $likeRepository;

    public function __construct(PostRepository $postRepository, BookmarkRepository $bookmarkRepository, LikeRepository $likeRepository)
    {
        $this->postRepository = $postRepository;
        $this->bookmarkRepository = $bookmarkRepository;
        $this->likeRepository = $likeRepository;
    }

    #[Route("/get", name: "related")]
    public function getUserRelatedPost(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        //If user is connected
        if($data->user !== "0"){
            $posts = [...$this->postRepository->getRelated($this->getUser())];
            $postsWithUserAction = [];
            foreach($posts as $post){
                $postsWithUserAction[] = [
                    "data" => $post,
                    "action" => [
                        "bookmark" => (bool)$this->bookmarkRepository->findOneBy(["post" => $post->getId(), "user" => $this->getUser()->getId()]),
                        "like" => (bool)$this->likeRepository->findOneBy(["post" => $post->getId(), "user" => $this->getUser()->getId()]),
                    ],
                ];
            }
            $posts = $postsWithUserAction;
        }
        else{
            $posts = $this->postRepository->getTrend();

        }
        shuffle($posts);
        return $this->json($posts);
    }

    #[Route("/new", name: "new")]
    public function new(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());
        if($this->getUser()){
            $this->postRepository->add(
                (new Post())
                ->setUser($this->getUser())
                ->setContent($data->post)
                ->setDate(new DateTime())
            );
        }
        return $this->json("new post");
    }

    #[Route("/remove", name: "remove")]
    public function remove(Request $request)
    {
        $post = json_decode($request->getContent())->post;
        $post = $this->postRepository->findOneBy(["id" => $post]);
        if($post->getUser()->getId() === $this->getUser()->getId()){
            $this->postRepository->remove($post);
        }
        return $this->json("removed " . $post->getId());
    }

}
