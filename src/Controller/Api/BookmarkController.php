<?php

namespace App\Controller\Api;

use App\Entity\Bookmark;
use App\Repository\BookmarkRepository;
use App\Repository\PostRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/bookmark", name: "bookmark_")]
class BookmarkController extends AbstractController
{

    private BookmarkRepository $bookmarkRepository;
    private PostRepository $postRepository;

    public function __construct(BookmarkRepository $bookmarkRepository, PostRepository $postRepository)
    {
        $this->bookmarkRepository = $bookmarkRepository;
        $this->postRepository = $postRepository;
    }

    #[Route('/get', name: 'get')]
    public function index(): Response
    {
        $data = [];
        foreach($this->bookmarkRepository->findBy(["user" => $this->getUser()->getId()]) as $post ){
            $data[] = [
                "data" => [
                    "content" => $post->getPost()->getContent(),
                    "id" => $post->getPost()->getId(),
                    "user" => $post->getUser()
                ]
            ];
        }
        return $this->json($data);
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    #[Route("/put", name: "put")]
    public function put(Request $req){
        $post = json_decode($req->getContent());

        $bookmark = $this->bookmarkRepository->findOneBy(["post" => $post->id, "user" => $this->getUser()->getId()]);
        if($bookmark){
            $this->bookmarkRepository->remove($bookmark);
            return $this->json(["bookmark" => false]);
        }
        $this->bookmarkRepository->add(
            (new Bookmark())
            ->setUser($this->getUser())
            ->setPost($this->postRepository->findOneBy(["id" => $post->id]))
        );
        return $this->json(["bookmark", true]);
    }
}
